import { Router } from 'express';
import CropsRoutes from '../../modules/crops/infrastructure/crops.route';
import ProducerRoutes from '../../modules/producer/infrastructure/producer.route';
import UserRoutes from '../../modules/user/infrastructure/user.route';
import ProducerCropRoutes from '../../modules/producer-crops/infrastructure/producer-crop.route';

class Routes {
  public static getRoutes(): Router[] {
    return [
      Router().use('/user', UserRoutes),
      Router().use('/producer', ProducerRoutes),
      Router().use('/crops', CropsRoutes),
      Router().use('/producer-crops', ProducerCropRoutes),
    ];
  }
}

export default Routes.getRoutes();
