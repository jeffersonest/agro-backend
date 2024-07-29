import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import ListProducersUseCase from '../application/use-cases/list-producer.usecase';
import GetProducerUseCase from '../application/use-cases/get-producer.usecase';
import DeleteProducerUseCase from '../application/use-cases/delete-producer.usecase';
import UpdateProducerUseCase from '../application/use-cases/update-producer.usecase';
import CreateProducerUseCase from '../application/use-cases/create-producer.usecase';
import { plainToClass } from 'class-transformer';
import Producer from '../domain/producer.entity';
import CreateProducerDTO from '../application/dto/create-producer.dto';
import UpdateProducerDTO from '../application/dto/update-producer.dto';
import { validateOrReject } from 'class-validator';
import ErrorHandler from '../../../shared/utils/errorHandler';

@injectable()
class ProducerController {
  constructor(
    @inject('CreateProducerUseCase')
    private readonly createProducerUseCase: CreateProducerUseCase,
    @inject('UpdateProducerUseCase')
    private readonly updateProducerUseCase: UpdateProducerUseCase,
    @inject('DeleteProducerUseCase')
    private readonly deleteProducerUseCase: DeleteProducerUseCase,
    @inject('GetProducerUseCase')
    private readonly getProducerUseCase: GetProducerUseCase,
    @inject('ListProducersUseCase')
    private readonly listProducersUseCase: ListProducersUseCase,
  ) {}

  public async createProducer(req: Request, res: Response): Promise<Response> {
    try {
      const data = plainToClass(CreateProducerDTO, req.body);
      await validateOrReject(data);
      await this.createProducerUseCase.execute(data);
      return res.status(201).json({ message: 'Producer created successfully' });
    } catch (error) {
      const { statusCode, body } = ErrorHandler.handle(error);
      return res.status(statusCode).json(body);
    }
  }

  public async updateProducer(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const data = plainToClass(UpdateProducerDTO, req.body);
      await validateOrReject(data);
      await this.updateProducerUseCase.execute(id, data);
      return res.status(200).json({ message: 'Producer updated successfully' });
    } catch (error) {
      const { statusCode, body } = ErrorHandler.handle(error);
      return res.status(statusCode).json(body);
    }
  }

  public async deleteProducer(req: Request, res: Response): Promise<Response> {
    try {
      const producer = new Producer();
      Object.assign(producer, req.body);
      await this.deleteProducerUseCase.execute(producer);
      return res.status(200).json({ message: 'Producer deleted successfully' });
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  }

  public async getProducer(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const producer = await this.getProducerUseCase.execute(id);
      if (!producer) {
        return res.status(404).json({ message: 'Producer not found' });
      }
      return res.status(200).json(producer);
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  }

  public async listProducers(req: Request, res: Response): Promise<Response> {
    try {
      const producers = await this.listProducersUseCase.execute();
      return res.status(200).json(producers);
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  }
}

export default ProducerController;
