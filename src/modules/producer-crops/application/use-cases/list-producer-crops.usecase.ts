import { inject, injectable } from 'tsyringe';
import ProducerCrop from '../../domain/producer-crop.entity';
import ProducerCropService from '../../domain/producer-crop.service';

@injectable()
class ListProducerCropsUseCase {
  constructor(
    @inject('ProducerCropService')
    private producerCropService: ProducerCropService,
  ) {}

  async execute(): Promise<ProducerCrop[]> {
    return this.producerCropService.listProducerCrops();
  }
}

export default ListProducerCropsUseCase;
