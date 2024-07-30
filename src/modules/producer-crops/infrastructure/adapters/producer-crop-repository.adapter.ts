import { injectable } from 'tsyringe';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../config/typeorm.config';
import ProducerCrop from '../../domain/producer-crop.entity';
import ProducerCropRepositoryPort from '../../domain/ports/producer-crop-repository.port';

@injectable()
class ProducerCropRepositoryAdapter implements ProducerCropRepositoryPort {
  private repository: Repository<ProducerCrop>;

  constructor() {
    this.repository = AppDataSource.getRepository(ProducerCrop);
  }

  async create(producerCrop: ProducerCrop): Promise<ProducerCrop> {
    return await this.repository.save(producerCrop);
  }

  async update(
    id: string,
    producerCrop: ProducerCrop,
  ): Promise<ProducerCrop | null> {
    const existingProducerCrop = await this.repository.findOneBy({ id });
    if (!existingProducerCrop) {
      return null;
    }
    const updatedProducerCrop = { ...existingProducerCrop, ...producerCrop };
    return await this.repository.save(updatedProducerCrop);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }

  async findById(id: string): Promise<ProducerCrop | null> {
    return await this.repository.findOneBy({ id });
  }

  async findAll(): Promise<ProducerCrop[]> {
    return await this.repository.find();
  }

  async findAllByProducer(producerId: string): Promise<ProducerCrop[]> {
    return await this.repository.find({
      where: { producer: { id: producerId } },
    });
  }

  async findAllByState(state: string): Promise<ProducerCrop[]> {
    return await this.repository
      .createQueryBuilder('producerCrop')
      .innerJoinAndSelect('producerCrop.producer', 'producer')
      .where('producer.state = :state', { state })
      .getMany();
  }
}

export default ProducerCropRepositoryAdapter;
