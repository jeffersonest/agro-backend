import { inject, injectable } from 'tsyringe';
import { AuthService } from '../../domain/auth.service';

@injectable()
export class RefreshTokenUseCase {
  constructor(@inject('AuthService') private authService: AuthService) {}

  async execute(refreshToken: string): Promise<{ accessToken: string }> {
    return this.authService.refreshToken(refreshToken);
  }
}
