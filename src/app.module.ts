import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { TracksModule } from './tracks/tracks.module';
import { AlbumsModule } from './albums/albums.module';
import { FavoritesModule } from './favorites/favorites.module';

import { LoggerToFileService } from './utils/logger-service/logger-to-file.service';
import { MyLoggerService } from './utils/logger-service/logger.service';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { JwtMiddleware } from './middleware/auth.middleware';
import { MyExceptionFilter } from './exceptions-filter';

import { typeOrmConfig } from './typeorm.config';
import { getJwtConfig } from './jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
    TypeOrmModule.forRoot(typeOrmConfig),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
    UsersModule,
    ArtistsModule,
    TracksModule,
    AlbumsModule,
    FavoritesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    MyLoggerService,
    LoggerToFileService,
    { provide: APP_FILTER, useClass: MyExceptionFilter },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    consumer
      .apply(JwtMiddleware)
      .exclude(...['/auth/signup', '/auth/login', '/doc', '/'])
      .forRoutes('*');
  }
}
