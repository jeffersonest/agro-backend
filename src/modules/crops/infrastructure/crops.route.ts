import { Router } from 'express';
import cropsController from './crops.controller';

class CropsRoute {
  private router: Router;

  constructor() {
    this.router = Router();
    this.router.get('/', cropsController.list.bind(cropsController));
  }

  getRoutes(): Router {
    return this.router;
  }
}

export default new CropsRoute().getRoutes();
