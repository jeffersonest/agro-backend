import User from '../user.entity';

abstract class UserRepositoryPort {
  abstract findAll(): Promise<User[]>;
  abstract create(user: User): Promise<User>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findById(id: string): Promise<User | null>;
  abstract update(id: string, user: User): Promise<User | null>;
  abstract delete(id: string): Promise<boolean>;
}

export default UserRepositoryPort;
