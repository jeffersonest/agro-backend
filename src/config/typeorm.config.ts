import { config } from 'dotenv';
config();
import { DataSource } from 'typeorm';
import Crops from '../modules/crops/domain/crops.entity';
import ProducerCrop from '../modules/producer-crops/domain/producer-crop.entity';
import Producer from '../modules/producer/domain/producer.entity';
import User from '../modules/user/domain/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'user',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || 'database',
  synchronize: false,
  logging: true,
  entities: [User, Producer, Crops, ProducerCrop],
  migrations: [__dirname + '/../shared/database/migrations/**/*.ts'],
  subscribers: [__dirname + '/../shared/database/subscribers/**/*.ts'],
});
