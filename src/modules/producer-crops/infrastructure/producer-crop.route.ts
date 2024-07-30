import { Router } from 'express';
import { container } from 'tsyringe';
import ProducerCropController from './producer-crop.controller';

class ProducerCropRoutes {
  private router: Router;

  constructor() {
    this.router = Router();
    const producerCropController = container.resolve(ProducerCropController);

    this.router.post(
      '/',
      producerCropController.createProducerCrop.bind(producerCropController),
    );
    this.router.put(
      '/:id',
      producerCropController.updateProducerCrop.bind(producerCropController),
    );
    this.router.delete(
      '/:id',
      producerCropController.deleteProducerCrop.bind(producerCropController),
    );
    this.router.get(
      '/',
      producerCropController.listProducerCrops.bind(producerCropController),
    );
    this.router.get(
      '/state/:state',
      producerCropController.listProducerCropsByState.bind(
        producerCropController,
      ),
    );
  }

  public getRoutes(): Router {
    return this.router;
  }
}

export default new ProducerCropRoutes().getRoutes();
