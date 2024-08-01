import { Router } from 'express';
import CropsRoutes from '../../modules/crops/infrastructure/crops.route';
import ProducerRoutes from '../../modules/producer/infrastructure/producer.route';
import UserRoutes from '../../modules/user/infrastructure/user.route';
import ProducerCropRoutes from '../../modules/producer-crops/infrastructure/producer-crop.route';
import StatisticsRoutes from '../../modules/statistics/infrastructure/statistics.route';
import AuthRoutes from '../../modules/auth/infrastructure/auth.route';
import AuthMiddleware from './middlewares/auth.middleware';

class Routes {
  public static getRoutes(): Router[] {
    return [
      Router().use('/user', UserRoutes),
      Router().use('/producer', AuthMiddleware.auth, ProducerRoutes),
      Router().use('/crops', AuthMiddleware.auth, CropsRoutes),
      Router().use('/producer-crops', AuthMiddleware.auth, ProducerCropRoutes),
      Router().use('/statistics', AuthMiddleware.auth, StatisticsRoutes),
      Router().use('/auth', AuthRoutes),
    ];
  }
}

export default Routes.getRoutes();
