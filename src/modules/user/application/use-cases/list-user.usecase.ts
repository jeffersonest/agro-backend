import { inject, injectable } from 'tsyringe';
import UserService from '../../domain/user.service';
import User from '../../domain/user.entity';

@injectable()
class ListUsersUseCase {
  constructor(@inject(UserService) private userService: UserService) {}

  async execute(): Promise<User[]> {
    return await this.userService.listUsers();
  }
}

export default ListUsersUseCase;
