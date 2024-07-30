import { inject, injectable } from 'tsyringe';
import ProducerCrop from '../../domain/producer-crop.entity';
import UpdateProducerCropDTO from '../dto/update-producer-crop.dto';
import ProducerCropService from '../../domain/producer-crop.service';

@injectable()
class UpdateProducerCropUseCase {
  constructor(
    @inject('ProducerCropService')
    private producerCropService: ProducerCropService,
  ) {}

  async execute(
    id: string,
    data: UpdateProducerCropDTO,
  ): Promise<ProducerCrop | null> {
    return this.producerCropService.updateProducerCrop(id, data);
  }
}

export default UpdateProducerCropUseCase;
