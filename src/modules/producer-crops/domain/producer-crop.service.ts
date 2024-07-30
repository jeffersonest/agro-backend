import { inject, injectable } from 'tsyringe';
import ProducerCrop from './producer-crop.entity';
import CreateProducerCropDTO from '../application/dto/create-producer-crop.dto';
import ProducerRepositoryPort from '../../producer/domain/ports/producer-repository.port';
import UpdateProducerCropDTO from '../application/dto/update-producer-crop.dto';
import ProducerCropRepositoryPort from './ports/producer-crop-repository.port';
import CropsRepositoryPort from '../../crops/domain/ports/crops-repository.port';

@injectable()
class ProducerCropService {
  constructor(
    @inject('ProducerCropRepositoryPort')
    private producerCropRepository: ProducerCropRepositoryPort,
    @inject('ProducerRepositoryPort')
    private producerRepository: ProducerRepositoryPort,
    @inject('CropRepositoryPort')
    private cropRepository: CropsRepositoryPort,
  ) {}

  async createProducerCrop(data: CreateProducerCropDTO): Promise<ProducerCrop> {
    const producer = await this.producerRepository.findById(data.producerId);
    if (!producer) {
      throw new Error('Producer not found');
    }

    const crops = await this.producerCropRepository.findAllByProducer(
      data.producerId,
    );
    const totalArea =
      crops.reduce((sum, crop) => sum + crop.area, 0) + data.area;

    if (totalArea > producer.farmSize) {
      throw new Error('Total crop area exceeds farm size');
    }
    const cropToAdd = await this.cropRepository.findById(data.cropId);
    const producerCrop = new ProducerCrop();
    Object.assign(producerCrop, { ...data, crop: cropToAdd, producer });
    return this.producerCropRepository.create(producerCrop);
  }

  async updateProducerCrop(
    id: string,
    data: UpdateProducerCropDTO,
  ): Promise<ProducerCrop | null> {
    const producer = await this.producerRepository.findById(data.producerId);
    if (!producer) {
      throw new Error('Producer not found');
    }

    const crops = await this.producerCropRepository.findAllByProducer(
      data.producerId,
    );
    const crop = crops.find((crop) => crop.id === id);
    const cropArea = crop?.area ?? 0;
    const totalArea =
      crops.reduce((sum, crop) => sum + crop.area, 0) - cropArea + data.area;

    if (totalArea > producer.farmSize) {
      throw new Error('Total crop area exceeds farm size');
    }

    const producerCrop = await this.producerCropRepository.findById(id);
    if (!producerCrop) {
      return null;
    }

    Object.assign(producerCrop, data);
    return this.producerCropRepository.update(id, producerCrop);
  }

  async listProducerCrops(): Promise<ProducerCrop[]> {
    return this.producerCropRepository.findAll();
  }

  async deleteProducerCrop(id: string): Promise<boolean> {
    return this.producerCropRepository.delete(id);
  }

  async listProducerCropsByState(state: string): Promise<ProducerCrop[]> {
    return this.producerCropRepository.findAllByState(state);
  }
}

export default ProducerCropService;
