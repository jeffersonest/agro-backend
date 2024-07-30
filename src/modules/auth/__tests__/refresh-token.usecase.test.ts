/* eslint-disable no-undef */
import 'reflect-metadata';
import '../../../config/tests.config';
import { RefreshTokenUseCase } from '../application/use-cases/refresh-token.usecase';
import { AuthService } from '../domain/auth.service';

describe('RefreshTokenUseCase', () => {
  let refreshTokenUseCase: RefreshTokenUseCase;
  let authService: AuthService;

  beforeEach(() => {
    authService = {
      login: jest.fn(),
      refreshToken: jest.fn(),
    } as unknown as AuthService;
    refreshTokenUseCase = new RefreshTokenUseCase(authService);
  });

  it('should return a new access token for a valid refresh token', async () => {
    const refreshToken = 'valid_refresh_token';

    (authService.refreshToken as jest.Mock).mockResolvedValue({
      accessToken: 'new_access_token',
    });

    const token = await refreshTokenUseCase.execute(refreshToken);
    expect(token).toEqual({ accessToken: 'new_access_token' });
  });

  it('should throw an error for an invalid refresh token', async () => {
    const refreshToken = 'invalid_refresh_token';

    (authService.refreshToken as jest.Mock).mockRejectedValue(
      new Error('Invalid token'),
    );

    await expect(refreshTokenUseCase.execute(refreshToken)).rejects.toThrow(
      'Invalid token',
    );
  });
});
