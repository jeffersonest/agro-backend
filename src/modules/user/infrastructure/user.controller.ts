import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import CreateUserUseCase from '../application/use-cases/create-user.usecase';
import UpdateUserUseCase from '../application/use-cases/update-user.usecase';
import DeleteUserUseCase from '../application/use-cases/delete-user.usecase';
import ListUsersUseCase from '../application/use-cases/list-user.usecase';
import GetUserUseCase from '../application/use-cases/get-user.usecase';
import { plainToClass } from 'class-transformer';
import CreateUserDTO from '../application/dto/create-user.dto';
import UpdateUserDTO from '../application/dto/update-user.dto';
import ErrorHandler from '../../../shared/utils/errorHandler';
import { validateOrReject } from 'class-validator';

@injectable()
class UserController {
  constructor(
    @inject('CreateUserUseCase')
    private readonly createUserUseCase: CreateUserUseCase,
    @inject('UpdateUserUseCase')
    private readonly updateUserUseCase: UpdateUserUseCase,
    @inject('DeleteUserUseCase')
    private readonly deleteUserUseCase: DeleteUserUseCase,
    @inject('ListUsersUseCase')
    private readonly listUsersUseCase: ListUsersUseCase,
    @inject('GetUserUseCase')
    private readonly getUserUseCase: GetUserUseCase,
  ) {}

  public async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const data = plainToClass(CreateUserDTO, req.body);
      await validateOrReject(data);
      const user = await this.createUserUseCase.execute(data);
      return res.status(201).json(user);
    } catch (error) {
      const { statusCode, body } = ErrorHandler.handle(error);
      return res.status(statusCode).json(body);
    }
  }

  public async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const data = plainToClass(UpdateUserDTO, req.body);
      await validateOrReject(data);
      const user = await this.updateUserUseCase.execute(id, data);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(user);
    } catch (error) {
      const { statusCode, body } = ErrorHandler.handle(error);
      return res.status(statusCode).json(body);
    }
  }

  public async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const success = await this.deleteUserUseCase.execute(id);
      if (!success) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  }

  public async listUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.listUsersUseCase.execute();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  }

  public async getUser(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const user = await this.getUserUseCase.execute(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  }
}

export default UserController;
