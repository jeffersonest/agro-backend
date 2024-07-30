import { inject, injectable } from 'tsyringe';
import ProducerCrop from '../../domain/producer-crop.entity';
import CreateProducerCropDTO from '../dto/create-producer-crop.dto';
import ProducerCropService from '../../domain/producer-crop.service';

@injectable()
class CreateProducerCropUseCase {
  constructor(
    @inject('ProducerCropService')
    private producerCropService: ProducerCropService,
  ) {}

  async execute(data: CreateProducerCropDTO): Promise<ProducerCrop> {
    return this.producerCropService.createProducerCrop(data);
  }
}

export default CreateProducerCropUseCase;
