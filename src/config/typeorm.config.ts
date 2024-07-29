import UserEntity from '../modules/user/domain/user.entity';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'user',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || 'database',
  synchronize: true,
  logging: true,
  entities: [UserEntity],
  migrations: ['src/shared/database/migrations/**/*.ts'],
  subscribers: ['src/shared/database/subscribers/**/*.ts'],
});
