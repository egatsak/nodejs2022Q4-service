/* import { TypeOrmModuleOptions } from '@nestjs/typeorm'; */
import { DataSourceOptions } from 'typeorm';

const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'postgres-db',
  port: +process.env.POSTGRES_PORT || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'rest_service',
  entities: [__dirname + '/**/*.entity.ts', __dirname + '/**/*.entity.js'],
  migrationsRun: false,
  logging: true,
  migrationsTableName: 'migration',
  migrations: [
    __dirname + '/migration/**/*.ts',
    __dirname + '/migration/**/*.js',
  ],
  synchronize: false,
};

export default typeOrmConfig;
