import { inject, injectable } from 'tsyringe';
import ProducerService from '../../domain/producer.service';
import Producer from '../../domain/producer.entity';

@injectable()
class ListProducersUseCase {
  constructor(
    @inject('ProducerService')
    private producerService: ProducerService,
  ) {}

  async execute(): Promise<Producer[]> {
    return await this.producerService.listProducers();
  }
}

export default ListProducersUseCase;
