import { inject, injectable } from 'tsyringe';
import ProducerRepositoryPort from './ports/producer-repository.port';
import Producer from './producer.entity';

@injectable()
class ProducerService {
  constructor(
    @inject('ProducerRepositoryPort')
    private producerRepository: ProducerRepositoryPort,
  ) {}

  async createProducer(producer: Producer): Promise<Producer> {
    return this.producerRepository.create(producer);
  }

  async updateProducer(
    id: string,
    producer: Producer,
  ): Promise<Producer | null> {
    return this.producerRepository.update(id, producer);
  }

  async deleteProducer(producer: Producer): Promise<boolean> {
    return this.producerRepository.delete(producer);
  }

  async getProducerById(id: string): Promise<Producer | null> {
    return this.producerRepository.findById(id);
  }

  async listProducers(): Promise<Producer[]> {
    return this.producerRepository.findAll();
  }
}

export default ProducerService;
