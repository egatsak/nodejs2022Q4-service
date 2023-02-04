import { Exclude } from 'class-transformer';

interface IUser {
  id: string; // uuid v4
  login: string;
  password: string; // integer number, increments on update
  version: number;
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

export class User implements IUser {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  @Exclude()
  password: string;

  constructor(partial: Partial<IUser>) {
    Object.assign(this, partial);
  }
}
