import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import Producer from '../../producer/domain/producer.entity';
import Crop from '../../crops/domain/crops.entity';

@Entity()
class ProducerCrop {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Producer, (producer) => producer.producerCrops, {
    eager: true,
  })
  @JoinColumn({ name: 'producerId' })
  producer: Producer;

  @ManyToOne(() => Crop, (crop) => crop.producerCrops, { eager: true })
  @JoinColumn({ name: 'cropId' })
  crop: Crop;

  @Column()
  area: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export default ProducerCrop;
