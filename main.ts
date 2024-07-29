import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config();
import './src/config/tsyringe.config';
import Server from './server';
import { AppDataSource } from './src/config/typeorm.config';

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');

    const server = new Server(4000);
    server.start();
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
