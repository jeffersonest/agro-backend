import { Router } from 'express';
import CropsRoutes from '../../modules/crops/infrastructure/crops.route';
import ProducerRoutes from '../../modules/producer/infrastructure/producer.route';
import UserRoutes from '../../modules/user/infrastructure/user.route';
import ProducerCropRoutes from '../../modules/producer-crops/infrastructure/producer-crop.route';
import StatisticsRoutes from '../../modules/statistics/infrastructure/statistics.route';
import AuthRoutes from '../../modules/auth/infrastructure/auth.route';

class Routes {
  public static getRoutes(): Router[] {
    return [
      Router().use('/user', UserRoutes),
      Router().use('/producer', ProducerRoutes),
      Router().use('/crops', CropsRoutes),
      Router().use('/producer-crops', ProducerCropRoutes),
      Router().use('/statistics', StatisticsRoutes),
      Router().use('/auth', AuthRoutes),
    ];
  }
}

export default Routes.getRoutes();
