import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserEntity, UserResponse } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getAll(): Promise<UserResponse[]> {
    const users = await this.userRepository.find();
    return users.map((user) => user.toResponse());
  }

  async getById(id: string): Promise<UserResponse> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} was not found!`);
    }
    return user.toResponse();
  }

  async createUser(dto: CreateUserDto): Promise<UserResponse> {
    const user = this.userRepository.create(dto);
    return (await this.userRepository.save(user)).toResponse();
  }

  async updateUserPassword(
    id: string,
    dto: UpdatePasswordDto,
  ): Promise<UserResponse> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user.validatePassword(dto.oldPassword)) {
      throw new ForbiddenException(`Incorrect password!`);
    }
    const newHashedPassword = await user.hashPassword(dto.newPassword);
    const updatedUser = await this.userRepository.save({
      ...user,
      password: newHashedPassword,
      version: user.version + 1,
    });

    return updatedUser;
  }

  async deleteUser(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }

  async getByLogin(login: string): Promise<UserResponse> {
    const user = await this.userRepository.findOne({ where: { login } });
    if (!user) {
      throw new NotFoundException();
    }
    return user.toResponse();
  }
}
