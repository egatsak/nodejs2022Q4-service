/* import { TypeOrmModuleOptions } from '@nestjs/typeorm'; */
import { DataSource, DataSourceOptions } from 'typeorm';

export const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: +process.env.POSTGRES_PORT || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'rest_service',
  entities: [__dirname + '/**/*.entity.ts', __dirname + '/**/*.entity.js'],
  logging: true,
  migrationsRun: false,
  migrationsTableName: 'migration',
  migrations: [
    __dirname + '../../migrations/**/*.ts',
    __dirname + '../../migrations/**/*.js',
  ],
  synchronize: false,
};

export const appDataSource = new DataSource(typeOrmConfig);

appDataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
