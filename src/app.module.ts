import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { TracksModule } from './tracks/tracks.module';
import { AlbumsModule } from './albums/albums.module';
import { FavoritesModule } from './favorites/favorites.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './typeorm.config';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from './jwt.config';
import { AuthModule } from './auth/auth.module';
import { JwtMiddleware } from './middleware/auth.middleware';
import { LoggerToFileService } from './utils/logger-service/logger-to-file.service';
import { MyLoggerService } from './utils/logger-service/logger.service';
import { LoggerMiddleware } from './middleware/logger.middleware';

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
  providers: [MyLoggerService, LoggerToFileService],
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
