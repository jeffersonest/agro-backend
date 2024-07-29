import { Router } from 'express';
import UserController from './user.controller';
import { container } from 'tsyringe';

class UserRoutes {
  private router: Router;

  constructor() {
    this.router = Router();
    const userController = container.resolve(UserController);

    this.router.post('/', userController.createUser.bind(userController));
    this.router.put('/:id', userController.updateUser.bind(userController));
    this.router.delete('/:id', userController.deleteUser.bind(userController));
    this.router.get('/', userController.listUsers.bind(userController));
    this.router.get('/:id', userController.getUser.bind(userController));
  }

  public getRoutes(): Router {
    return this.router;
  }
}

export default new UserRoutes().getRoutes();
