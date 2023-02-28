import {
  Injectable,
  ExecutionContext,
  CanActivate,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const split = request.headers.authorization.split(' ');
      const bearer = split[0];
      const token = split[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException(
          `Please provide Authorization header with "Bearer: Token"`,
        );
      }

      const user = this.jwtService.verify(token);

      if (user) {
        return true;
      } else {
        throw new UnauthorizedException('Incorrect or expired token!');
      }
    } catch (e) {
      throw e;
    }
  }
}
