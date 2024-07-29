import { inject, injectable } from 'tsyringe';
import UserService from '../../domain/user.service';

@injectable()
class DeleteUserUseCase {
  constructor(@inject(UserService) private userService: UserService) {}

  async execute(id: string): Promise<boolean> {
    return await this.userService.deleteUser(id);
  }
}

export default DeleteUserUseCase;
