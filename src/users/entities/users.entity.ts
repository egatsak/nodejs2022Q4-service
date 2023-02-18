import {
  BaseEntity,
  Column,
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import bcrypt from 'bcrypt';

export type UserResponse = Omit<
  UserEntity,
  | 'password'
  | 'validatePassword'
  | 'toResponse'
  | 'hasId'
  | 'save'
  | 'remove'
  | 'softRemove'
  | 'recover'
  | 'reload'
  | 'hashPassword'
>;

@Entity()
@Unique(['login'])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  login: string;

  @Column({ type: 'int' })
  version: number;

  @CreateDateColumn()
  createdAt: number;

  @CreateDateColumn()
  updatedAt: number;

  @Column({ type: 'varchar' })
  @Exclude()
  password: string;
  /* 
  constructor(partial: Partial<UserEntity>) {
    super();
    Object.assign(this, partial);
  } */

  async hashPassword(password: string): Promise<string> {
    const hashed = await bcrypt.hash(password, +process.env.SALT || 10);
    return hashed;
  }

  async validatePassword(password: string): Promise<boolean> {
    const match = await bcrypt.compare(password, this.password);
    return match;
  }

  toResponse(): UserResponse {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = this;
    return rest;
  }
}
