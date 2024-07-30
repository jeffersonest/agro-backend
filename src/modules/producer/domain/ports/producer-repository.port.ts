import Producer from '../producer.entity';

abstract class ProducerRepositoryPort {
  abstract create(producer: Producer): Promise<Producer>;
  abstract update(id: string, producer: Producer): Promise<Producer | null>;
  abstract delete(producer: Producer): Promise<boolean>;
  abstract findById(id: string): Promise<Producer | null>;
  abstract findAll(): Promise<Producer[]>;
  abstract identificationExists(identification: string): Promise<boolean>;
}

export default ProducerRepositoryPort;
