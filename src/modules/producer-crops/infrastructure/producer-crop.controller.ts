import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import CreateProducerCropDTO from '../application/dto/create-producer-crop.dto';
import UpdateProducerCropDTO from '../application/dto/update-producer-crop.dto';
import CreateProducerCropUseCase from '../application/use-cases/create-producer-crop.usecase';
import UpdateProducerCropUseCase from '../application/use-cases/update-producer-crop.usecase';
import ListProducerCropsUseCase from '../application/use-cases/list-producer-crops.usecase';
import DeleteProducerCropUseCase from '../application/use-cases/delete-producer-crop.usecase';
import ListProducerCropsByStateUseCase from '../application/use-cases/list-producer-crops-by-state.usecase';
import ErrorHandler from '../../../shared/utils/errorHandler';

@injectable()
class ProducerCropController {
  constructor(
    @inject('CreateProducerCropUseCase')
    private readonly createProducerCropUseCase: CreateProducerCropUseCase,
    @inject('UpdateProducerCropUseCase')
    private readonly updateProducerCropUseCase: UpdateProducerCropUseCase,
    @inject('DeleteProducerCropUseCase')
    private readonly deleteProducerCropUseCase: DeleteProducerCropUseCase,
    @inject('ListProducerCropsUseCase')
    private readonly listProducerCropsUseCase: ListProducerCropsUseCase,
    @inject('ListProducerCropsByStateUseCase')
    private readonly listProducerCropsByStateUseCase: ListProducerCropsByStateUseCase,
  ) {}

  public async createProducerCrop(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const data = plainToClass(CreateProducerCropDTO, req.body);
      await validateOrReject(data);
      const producerCrop = await this.createProducerCropUseCase.execute(data);
      return res.status(201).json(producerCrop);
    } catch (error) {
      const { statusCode, body } = ErrorHandler.handle(error);
      return res.status(statusCode).json(body);
    }
  }

  public async updateProducerCrop(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const { id } = req.params;
      const data = plainToClass(UpdateProducerCropDTO, req.body);
      await validateOrReject(data);
      const producerCrop = await this.updateProducerCropUseCase.execute(
        id,
        data,
      );
      if (!producerCrop) {
        return res.status(404).json({ message: 'Producer crop not found' });
      }
      return res.status(200).json(producerCrop);
    } catch (error) {
      const { statusCode, body } = ErrorHandler.handle(error);
      return res.status(statusCode).json(body);
    }
  }

  public async deleteProducerCrop(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const { id } = req.params;
      const success = await this.deleteProducerCropUseCase.execute(id);
      if (!success) {
        return res.status(404).json({ message: 'Producer crop not found' });
      }
      return res
        .status(200)
        .json({ message: 'Producer crop deleted successfully' });
    } catch (error) {
      const { statusCode, body } = ErrorHandler.handle(error);
      return res.status(statusCode).json(body);
    }
  }

  public async listProducerCrops(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const producerCrops = await this.listProducerCropsUseCase.execute();
      return res.status(200).json(producerCrops);
    } catch (error) {
      const { statusCode, body } = ErrorHandler.handle(error);
      return res.status(statusCode).json(body);
    }
  }

  public async listProducerCropsByState(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const { state } = req.params;
      const producerCrops =
        await this.listProducerCropsByStateUseCase.execute(state);
      return res.status(200).json(producerCrops);
    } catch (error) {
      const { statusCode, body } = ErrorHandler.handle(error);
      return res.status(statusCode).json(body);
    }
  }
}

export default ProducerCropController;
