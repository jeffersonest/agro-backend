import { inject, injectable } from 'tsyringe';
import { AuthService } from '../../domain/auth.service';
import { LoginDTO } from '../dto/login.dto';

@injectable()
export class LoginUseCase {
  constructor(@inject('AuthService') private authService: AuthService) {}

  async execute(
    data: LoginDTO,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return this.authService.login(data.email, data.password);
  }
}
