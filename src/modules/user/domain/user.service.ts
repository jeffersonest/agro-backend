import { inject, injectable } from 'tsyringe';
import UserRepositoryPort from './ports/user-repository.port';
import User from './user.entity';
import { Validator } from 'class-validator';
import * as bcrypt from 'bcrypt';

@injectable()
class UserService {
  constructor(
    @inject('UserRepositoryPort') private userRepository: UserRepositoryPort,
  ) {}

  async createUser(data: {
    email: string;
    password: string;
    name: string;
  }): Promise<User> {
    const userExists = await this.userRepository.findByEmail(data.email);
    if (userExists) {
      throw new Error('User already exists');
    }

    const user = new User();
    user.email = data.email;
    user.password = bcrypt.hashSync(
      data.password,
      process.env.SALT_ROUNDS ?? 10,
    );
    user.name = data.name;

    return await this.userRepository.create(user);
  }

  async getUserById(id: string): Promise<User | null> {
    return await this.userRepository.findById(id);
  }

  async listUsers(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async updateUser(id: string, data: Partial<User>): Promise<User | null> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    if (data.email) {
      const userExists = await this.userMailExists(id, data.email);
      if (userExists) {
        throw new Error('Email already in use');
      }
      user.email = data.email;
    }
    if (data.password)
      user.password = bcrypt.hashSync(
        data.password,
        process.env.SALT_ROUNDS ?? 10,
      );
    if (data.name) user.name = data.name;

    return await this.userRepository.update(id, user);
  }

  async userMailExists(id: string, email: string): Promise<boolean> {
    const userExists = await this.userRepository.findByEmail(email);
    if (userExists && userExists.id !== id) {
      return true;
    } else {
      return false;
    }
  }

  async deleteUser(id: string): Promise<boolean> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    return await this.userRepository.delete(id);
  }
}

export default UserService;
