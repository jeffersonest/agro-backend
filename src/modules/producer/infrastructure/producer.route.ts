import { Router } from 'express';
import { container } from 'tsyringe';
import ProducerController from './producer.controller';
class ProducerRoutes {
  private router: Router;

  constructor() {
    this.router = Router();
    const producerController = container.resolve(ProducerController);

    this.router.post(
      '/',
      producerController.createProducer.bind(producerController),
    );
    this.router.put(
      '/:id',
      producerController.updateProducer.bind(producerController),
    );
    this.router.delete(
      '/:id',
      producerController.deleteProducer.bind(producerController),
    );
    this.router.get(
      '/',
      producerController.listProducers.bind(producerController),
    );
    this.router.get(
      '/:id',
      producerController.getProducer.bind(producerController),
    );
  }

  public getRoutes(): Router {
    return this.router;
  }
}

export default new ProducerRoutes().getRoutes();
