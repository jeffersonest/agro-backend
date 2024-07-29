import { inject, injectable } from 'tsyringe';

import { CreateUserDTO } from '../dto/create-user.dto';
import UserService from '../../domain/user.service';
import User from '../../domain/user.entity';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UserService')
    private readonly userService: UserService,
  ) {}

  async execute(data: CreateUserDTO): Promise<User> {
    try {
      return await this.userService.createUser(data);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}

export default CreateUserUseCase;
