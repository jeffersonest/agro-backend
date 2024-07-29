import { inject, injectable } from 'tsyringe';
import ProducerService from '../../domain/producer.service';
import Producer from '../../domain/producer.entity';

@injectable()
class GetProducerUseCase {
  constructor(
    @inject('ProducerService')
    private producerService: ProducerService,
  ) {}

  async execute(id: string): Promise<Producer | null> {
    return this.producerService.getProducerById(id);
  }
}

export default GetProducerUseCase;
