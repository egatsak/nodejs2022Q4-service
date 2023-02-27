import {
  Injectable,
  UnauthorizedException,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(
    req: Request & { user: string },
    res: Response,
    next: NextFunction,
  ) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];

      try {
        const decoded = await this.jwtService.verify(token);
        req.user = decoded;
        next();
      } catch (err) {
        throw new UnauthorizedException('Incorrect Token!');
      }
    } else {
      throw new UnauthorizedException(
        'Please provide Authorization header with "Bearer: Token"',
      );
    }
  }
}
