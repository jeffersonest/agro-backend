import { Router } from 'express';
import { container } from 'tsyringe';
import CropController from './crops.controller';

class CropRoutes {
  private router: Router;

  constructor() {
    this.router = Router();
    const cropController = container.resolve(CropController);

    this.router.post('/', cropController.createCrop.bind(cropController));
    this.router.put('/:id', cropController.updateCrop.bind(cropController));
    this.router.delete('/:id', cropController.deleteCrop.bind(cropController));
    this.router.get('/:id', cropController.getCrop.bind(cropController));
    this.router.get('/', cropController.listCrops.bind(cropController));
  }

  public getRoutes(): Router {
    return this.router;
  }
}

export default new CropRoutes().getRoutes();
