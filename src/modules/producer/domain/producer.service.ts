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
    const producerExists = await this.producerIdentificationExists(
      producer.identification,
    );
    if (producerExists) {
      throw new Error('Producer identification already exists');
    }
    return this.producerRepository.create(producer);
  }

  async producerIdentificationExists(identification: string): Promise<boolean> {
    return this.producerRepository.identificationExists(identification);
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
