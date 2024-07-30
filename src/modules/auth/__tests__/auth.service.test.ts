/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-undef */
import 'reflect-metadata';
import '../../../config/tests.config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserRepositoryPort from '../../user/domain/ports/user-repository.port';
import { AuthService } from '../domain/auth.service';
import User from '../../user/domain/user.entity';

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: UserRepositoryPort;

  beforeEach(() => {
    userRepository = {
      findByEmail: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
    } as unknown as UserRepositoryPort;
    authService = new AuthService(userRepository);
  });

  describe('login', () => {
    it('should return access and refresh tokens for valid credentials', async () => {
      const user: User = {
        id: '1',
        email: 'test@example.com',
        password: await bcrypt.hash('password', 10),
        name: 'Test User',
        createdAt: new Date(),
      };

      (userRepository.findByEmail as jest.Mock).mockResolvedValue(user);
      const tokens = await authService.login('test@example.com', 'password');

      expect(tokens).toHaveProperty('accessToken');
      expect(tokens).toHaveProperty('refreshToken');
    });

    it('should throw an error for invalid credentials', async () => {
      (userRepository.findByEmail as jest.Mock).mockResolvedValue(null);

      await expect(
        authService.login('test@example.com', 'password'),
      ).rejects.toThrow('Invalid email or password');
    });
  });

  describe('refreshToken', () => {
    it('should return a new access token for a valid refresh token', async () => {
      const user: User = {
        id: '1',
        email: 'test@example.com',
        password: 'password',
        name: 'Test User',
        createdAt: new Date(),
      };

      (userRepository.findById as jest.Mock).mockResolvedValue(user);
      const refreshToken = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' },
      );
      const token = await authService.refreshToken(refreshToken);

      expect(token).toHaveProperty('accessToken');
    });

    it('should throw an error for an invalid refresh token', async () => {
      await expect(authService.refreshToken('invalid_token')).rejects.toThrow(
        'Invalid token',
      );
    });
  });
});
