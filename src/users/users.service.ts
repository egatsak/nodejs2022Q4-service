import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User, UserResponse } from './entities/users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAll(): Promise<UserResponse[]> {
    const users = await this.userRepository.find();
    return users.map((user) => user.toResponse());
  }

  async getById(id: string): Promise<UserResponse> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} was not found!`);
    }
    return user.toResponse();
  }

  async createUser(dto: CreateUserDto): Promise<UserResponse> {
    const hashedPassword = await this.hashPassword(dto.password);

    const user = this.userRepository.create({
      ...dto,
      password: hashedPassword,
    });
    return (await this.userRepository.save(user)).toResponse();
  }

  async updateUserPassword(
    id: string,
    dto: UpdatePasswordDto,
  ): Promise<UserResponse> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} was not found!`);
    }

    if (!(await this.validatePassword(dto.oldPassword, user.password))) {
      throw new ForbiddenException(`Incorrect password!`);
    }

    const newHashedPassword = await this.hashPassword(dto.newPassword);
    const updatedUser = await this.userRepository.save({
      ...user,
      password: newHashedPassword,
      version: user.version + 1,
    });

    return new User(updatedUser).toResponse();
  }

  async deleteUser(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found!`);
    }
  }

  async getByLogin(login: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { login } });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async validatePassword(
    plaintextPassword: string,
    hash: string,
  ): Promise<boolean> {
    const equal = await bcrypt.compare(plaintextPassword, hash);
    return equal;
  }

  async hashPassword(password: string): Promise<string> {
    const hashed = await bcrypt.hash(password, +process.env.SALT || 10);
    return hashed;
  }
}
