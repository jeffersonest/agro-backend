import { inject, injectable } from 'tsyringe';
import ProducerService from '../../domain/producer.service';
import Producer from '../../domain/producer.entity';
@injectable()
class DeleteProducerUseCase {
  constructor(
    @inject('ProducerService')
    private producerService: ProducerService,
  ) {}

  async execute(producer: Producer): Promise<boolean> {
    return this.producerService.deleteProducer(producer);
  }
}

export default DeleteProducerUseCase;
