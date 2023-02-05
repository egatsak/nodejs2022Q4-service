import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { Db } from 'src/db/db.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './users.interface';

@Injectable()
export class UsersService {
  constructor(private readonly db: Db) {}

  async getAll(): Promise<User[]> {
    const users = await this.db.getAllUsers();
    return users.map((user) => new User(user));
  }

  async getById(id: string): Promise<User> {
    const user = await this.db.getUserByKey({ key: 'id', equals: id });
    if (!user) {
      throw new NotFoundException();
    }
    return new User(user);
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    const user = await this.db.createUser(dto);
    return new User(user);
  }

  async updateUserPassword(id: string, dto: UpdatePasswordDto): Promise<User> {
    const user = await this.getById(id);
    if (user.password !== dto.oldPassword) {
      throw new ForbiddenException();
    }
    const updatedUser = await this.db.updateUser(id, {
      password: dto.newPassword,
    });
    return new User(updatedUser);
  }

  async deleteUser(id: string) {
    const user = await this.getById(id);
    if (!user) {
      throw new NotFoundException();
    }
    await this.db.deleteUser(id);
    return new User(user);
  }
}
