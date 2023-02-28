import { UserResponse } from 'src/users/entities/users.entity';

export interface UserTokenResponse extends UserResponse {
  accessToken: string;
  refreshToken: string;
}
