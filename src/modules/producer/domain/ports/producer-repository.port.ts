import Producer from '../producer.entity';

abstract class ProducerRepositoryPort {
  abstract create(producer: Producer): Promise<void>;
  abstract update(producer: Producer): Promise<void>;
  abstract delete(producer: Producer): Promise<void>;
  abstract findById(id: string): Promise<Producer>;
  abstract findAll(): Promise<Producer[]>;
}

export default ProducerRepositoryPort;
