import { inject, injectable } from 'tsyringe';
import UserService from '../../domain/user.service';
import User from '../../domain/user.entity';
import CreateUserDTO from '../dto/create-user.dto';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UserService')
    private readonly userService: UserService,
  ) {}

  async execute(user: CreateUserDTO): Promise<User> {
    return await this.userService.createUser(user);
  }
}

export default CreateUserUseCase;
