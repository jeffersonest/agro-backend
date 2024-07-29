import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v7 as uuidv7 } from 'uuid';

@Entity()
class Crops {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

export default Crops;
