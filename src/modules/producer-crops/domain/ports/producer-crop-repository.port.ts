import ProducerCrop from '../producer-crop.entity';

abstract class ProducerCropRepositoryPort {
  abstract create(producerCrop: ProducerCrop): Promise<ProducerCrop>;
  abstract update(
    id: string,
    producerCrop: ProducerCrop,
  ): Promise<ProducerCrop | null>;
  abstract delete(id: string): Promise<boolean>;
  abstract findById(id: string): Promise<ProducerCrop | null>;
  abstract findAll(): Promise<ProducerCrop[]>;
  abstract findAllByProducer(producerId: string): Promise<ProducerCrop[]>;
  abstract findAllByState(state: string): Promise<ProducerCrop[]>;
}

export default ProducerCropRepositoryPort;
