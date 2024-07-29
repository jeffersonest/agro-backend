import { inject, injectable } from 'tsyringe';
import UserService from '../../domain/user.service';
import User from '../../domain/user.entity';
import UpdateUserDTO from '../dto/update-user.dto';

@injectable()
class UpdateUserUseCase {
  constructor(@inject(UserService) private userService: UserService) {}

  async execute(id: string, user: UpdateUserDTO): Promise<User | null> {
    return await this.userService.updateUser(id, user);
  }
}

export default UpdateUserUseCase;
