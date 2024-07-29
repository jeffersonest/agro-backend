import { Router } from 'express';
import producerController from './producer.controller';
class ProcuderRoutes {
  private router: Router;

  constructor() {
    this.router = Router();
    this.router.post(
      '/',
      producerController.createProducer.bind(producerController),
    );
  }

  public getRoutes(): Router {
    return this.router;
  }
}

export default new ProcuderRoutes().getRoutes();
