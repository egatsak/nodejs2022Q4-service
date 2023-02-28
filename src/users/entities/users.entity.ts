import {
  Column,
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  /*   Unique, */
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

export type UserResponse = Omit<
  User,
  'password' | 'toResponse' | 'createdAt' | 'updatedAt'
> & { createdAt: number; updatedAt: number };

@Entity()
/* @Unique(['login']) */
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @VersionColumn()
  version: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  @Exclude()
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  toResponse(): UserResponse {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, createdAt, updatedAt, ...rest } = this;
    return {
      ...rest,
      createdAt: createdAt.getTime(),
      updatedAt: updatedAt.getTime(),
    };
  }
}
