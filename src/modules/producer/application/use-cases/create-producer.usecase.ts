import { inject, injectable } from 'tsyringe';
import Producer from '../../domain/producer.entity';
import ProducerService from '../../domain/producer.service';
import CreateProducerDTO from '../dto/create-producer.dto';

@injectable()
class CreateProducerUseCase {
  constructor(
    @inject('ProducerService')
    private producerService: ProducerService,
  ) {}

  async execute(data: CreateProducerDTO): Promise<Producer> {
    const producer = new Producer();
    Object.assign(producer, data);
    return this.producerService.createProducer(producer);
  }
}

export default CreateProducerUseCase;
