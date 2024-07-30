import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { v7 as uuidv7 } from 'uuid';
import ProducerCrop from '../../producer-crops/domain/producer-crop.entity';

@Entity()
class Crop {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => ProducerCrop, (producerCrop) => producerCrop.crop)
  producerCrops: ProducerCrop[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv7();
    }
  }
}

export default Crop;
