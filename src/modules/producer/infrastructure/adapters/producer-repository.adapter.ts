import { injectable } from 'tsyringe';
import ProducerRepositoryPort from '../../domain/ports/producer-repository.port';
import Producer from '../../domain/producer.entity';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../config/typeorm.config';

@injectable()
class ProducerRepositoryAdapter implements ProducerRepositoryPort {
  private respository: Repository<Producer>;

  constructor() {
    this.respository = AppDataSource.getRepository(Producer);
  }

  async create(producer: Producer): Promise<Producer> {
    return this.respository.save(producer);
  }
  async update(id: string, producer: Producer): Promise<Producer | null> {
    await this.respository.update(id, producer);
    return this.findById(id);
  }
  async delete(producer: Producer): Promise<boolean> {
    const result = await this.respository.delete(producer);
    return result.affected !== 0;
  }
  async findById(id: string): Promise<Producer | null> {
    return this.respository.findOne({ where: { id } });
  }
  findAll(): Promise<Producer[]> {
    return this.respository.find();
  }
}

export default ProducerRepositoryAdapter;
