import { inject, injectable } from 'tsyringe';
import ProducerService from '../../domain/producer.service';
import Producer from '../../domain/producer.entity';
import UpdateProducerDTO from '../dto/update-producer.dto';

@injectable()
class UpdateProducerUseCase {
  constructor(
    @inject('ProducerService')
    private producerService: ProducerService,
  ) {}

  async execute(id: string, data: UpdateProducerDTO): Promise<Producer | null> {
    const producer = new Producer();
    Object.assign(producer, data);
    return this.producerService.updateProducer(id, producer);
  }
}

export default UpdateProducerUseCase;
