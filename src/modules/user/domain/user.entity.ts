import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { v7 as uuidv7 } from 'uuid';

@Entity()
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv7();
    }
  }
}

export default User;
