import {
  Column,
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  /*   Unique, */
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

export type UserResponse = Omit<
  UserEntity,
  'password' | 'toResponse' | 'createdAt' | 'updatedAt'
> & { createdAt: number; updatedAt: number };

@Entity()
/* @Unique(['login']) */
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column({ default: 1 })
  version: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
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
