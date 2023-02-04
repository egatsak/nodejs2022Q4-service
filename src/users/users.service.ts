import { Injectable } from '@nestjs/common';
import { User } from './users.interface';

@Injectable()
export class UsersService {
  constructor(private readonly db: DB) {}
  async findMany() {
    const users = await this.db.users.findMany();

    return users.map((user) => new User(user));
  }
}
