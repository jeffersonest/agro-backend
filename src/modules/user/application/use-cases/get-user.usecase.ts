import { inject, injectable } from 'tsyringe';
import UserService from '../../domain/user.service';
import User from '../../domain/user.entity';

@injectable()
class GetUserUseCase {
  constructor(@inject(UserService) private userService: UserService) {}

  async execute(id: string): Promise<User | null> {
    return await this.userService.getUserById(id);
  }
}

export default GetUserUseCase;
