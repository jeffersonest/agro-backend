import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { LoginUseCase } from '../application/use-cases/login.usecase';
import { RefreshTokenUseCase } from '../application/use-cases/refresh-token.usecase';
import { LoginDTO } from '../application/dto/login.dto';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import ErrorHandler from '../../../shared/utils/errorHandler';

@injectable()
class AuthController {
  constructor(
    @inject('LoginUseCase') private loginUseCase: LoginUseCase,
    @inject('RefreshTokenUseCase')
    private refreshTokenUseCase: RefreshTokenUseCase,
  ) {}

  public async login(req: Request, res: Response): Promise<Response> {
    try {
      const data = plainToClass(LoginDTO, req.body);
      await validateOrReject(data);
      const tokens = await this.loginUseCase.execute(data);
      return res.status(200).json(tokens);
    } catch (error) {
      const { statusCode, body } = ErrorHandler.handle(error);
      return res.status(statusCode).json(body);
    }
  }

  public async refreshToken(req: Request, res: Response): Promise<Response> {
    try {
      const { refreshToken } = req.body;
      const token = await this.refreshTokenUseCase.execute(refreshToken);
      return res.status(200).json(token);
    } catch (error) {
      const { statusCode, body } = ErrorHandler.handle(error);
      return res.status(statusCode).json(body);
    }
  }
}

export default AuthController;
