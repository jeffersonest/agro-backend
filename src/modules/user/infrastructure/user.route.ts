import { Router } from 'express';
import UserController from './user.controller';
import { container } from 'tsyringe';
import AuthMiddleware from '../../../shared/infrastucture/middlewares/auth.middleware';

class UserRoutes {
  private router: Router;

  constructor() {
    this.router = Router();
    const userController = container.resolve(UserController);

    this.router.post('/', userController.createUser.bind(userController));
    this.router.put(
      '/:id',
      AuthMiddleware.auth,
      userController.updateUser.bind(userController),
    );
    this.router.delete(
      '/:id',
      AuthMiddleware.auth,
      userController.deleteUser.bind(userController),
    );
    this.router.get(
      '/',
      AuthMiddleware.auth,
      userController.listUsers.bind(userController),
    );
    this.router.get(
      '/:id',
      AuthMiddleware.auth,
      userController.getUser.bind(userController),
    );
  }

  public getRoutes(): Router {
    return this.router;
  }
}

export default new UserRoutes().getRoutes();
