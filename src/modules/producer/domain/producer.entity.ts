import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v7 as uuidv7 } from 'uuid';

@Entity()
class Producer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 14, nullable: false, unique: true })
  identification: string;

  @Column()
  producerName: string;

  @Column()
  farmName: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  farmSize: number;

  @Column()
  usableArea: number;

  @Column()
  vegetationArea: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv7();
    }
  }
}

export default Producer;
