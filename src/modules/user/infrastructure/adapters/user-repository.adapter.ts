import { Repository } from 'typeorm';
import { injectable } from 'tsyringe';
import UserRepositoryPort from '../../domain/ports/user-repository.port';
import { AppDataSource } from '../../../../config/typeorm.config';
import User from '../../domain/user.entity';

@injectable()
class UserRepositoryAdapter implements UserRepositoryPort {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async findAll(): Promise<User[]> {
    return await this.repository.find();
  }

  async create(user: User): Promise<User> {
    return await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.repository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return await this.repository.findOne({ where: { id } });
  }

  async update(id: string, user: User): Promise<User | null> {
    await this.repository.update(id, user);
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }
}

export default UserRepositoryAdapter;
