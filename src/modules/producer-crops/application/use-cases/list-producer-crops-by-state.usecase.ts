import { inject, injectable } from 'tsyringe';
import ProducerCrop from '../../domain/producer-crop.entity';
import ProducerCropService from '../../domain/producer-crop.service';

@injectable()
class ListProducerCropsByStateUseCase {
  constructor(
    @inject('ProducerCropService')
    private producerCropService: ProducerCropService,
  ) {}

  async execute(state: string): Promise<ProducerCrop[]> {
    return this.producerCropService.listProducerCropsByState(state);
  }
}

export default ListProducerCropsByStateUseCase;
