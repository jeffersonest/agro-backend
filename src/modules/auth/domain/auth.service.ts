/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { injectable, inject } from 'tsyringe';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../../user/domain/user.entity';
import UserRepositoryPort from '../../user/domain/ports/user-repository.port';

@injectable()
export class AuthService {
  constructor(
    @inject('UserRepositoryPort')
    private userRepository: UserRepositoryPort,
  ) {}

  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid email or password');
    }
    const accessToken = this.generateToken(user, '1h');
    const refreshToken = this.generateToken(user, '7d');
    return { accessToken, refreshToken };
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    try {
      const payload = jwt.verify(refreshToken, process.env.JWT_SECRET!) as User;
      const user = await this.userRepository.findById(payload.id);
      if (!user) throw new Error('Invalid token');
      const accessToken = this.generateToken(user, '1h');
      return { accessToken };
    } catch {
      throw new Error('Invalid token');
    }
  }

  private generateToken(user: User, expiresIn: string): string {
    return jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn },
    );
  }
}
