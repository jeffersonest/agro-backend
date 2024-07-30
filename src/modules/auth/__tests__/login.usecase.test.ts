/* eslint-disable no-undef */
import 'reflect-metadata';
import '../../../config/tests.config';
import { LoginUseCase } from '../application/use-cases/login.usecase';
import { AuthService } from '../domain/auth.service';
import { LoginDTO } from '../application/dto/login.dto';

describe('LoginUseCase', () => {
  let loginUseCase: LoginUseCase;
  let authService: AuthService;

  beforeEach(() => {
    authService = {
      login: jest.fn(),
      refreshToken: jest.fn(),
    } as unknown as AuthService;
    loginUseCase = new LoginUseCase(authService);
  });

  it('should return tokens for valid credentials', async () => {
    const loginDTO: LoginDTO = {
      email: 'test@example.com',
      password: 'password',
    };

    (authService.login as jest.Mock).mockResolvedValue({
      accessToken: 'access_token',
      refreshToken: 'refresh_token',
    });

    const tokens = await loginUseCase.execute(loginDTO);
    expect(tokens).toEqual({
      accessToken: 'access_token',
      refreshToken: 'refresh_token',
    });
  });

  it('should throw an error for invalid credentials', async () => {
    const loginDTO: LoginDTO = {
      email: 'invalid@example.com',
      password: 'password',
    };

    (authService.login as jest.Mock).mockRejectedValue(
      new Error('Invalid email or password'),
    );

    await expect(loginUseCase.execute(loginDTO)).rejects.toThrow(
      'Invalid email or password',
    );
  });
});
