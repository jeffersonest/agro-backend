import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { v7 as uuidv7 } from 'uuid';
import Producer from '../../producer/domain/producer.entity';
import Crop from '../../crops/domain/crops.entity';

@Entity()
class ProducerCrop {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Producer, { eager: true })
  @JoinColumn({ name: 'producerId' })
  producer: Producer;

  @ManyToOne(() => Crop, { eager: true })
  @JoinColumn({ name: 'cropId' })
  crop: Crop;

  @Column()
  area: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv7();
    }
  }
}

export default ProducerCrop;
