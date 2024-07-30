import { Router } from 'express';
import { container } from 'tsyringe';
import AuthController from './auth.controller';

class AuthRoutes {
  private router: Router;

  constructor() {
    this.router = Router();
    const authController = container.resolve(AuthController);

    this.router.post('/login', authController.login.bind(authController));
    this.router.post(
      '/refresh-token',
      authController.refreshToken.bind(authController),
    );
  }

  public getRoutes(): Router {
    return this.router;
  }
}

export default new AuthRoutes().getRoutes();
