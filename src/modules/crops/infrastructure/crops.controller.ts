import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import CreateCropUseCase from '../application/use-cases/create-crop.usecase';
import UpdateCropUseCase from '../application/use-cases/update-crop.usecase';
import DeleteCropUseCase from '../application/use-cases/delete-crop.usecase';
import GetCropUseCase from '../application/use-cases/get-crop.usecase';
import ListCropsUseCase from '../application/use-cases/list-crop.usecase';
import CreateCropDTO from '../application/dto/create-crop.dto';
import ErrorHandler from '../../../shared/utils/errorHandler';
import UpdateCropDTO from '../application/dto/update-crop.dto';

@injectable()
class CropController {
  constructor(
    @inject('CreateCropUseCase')
    private readonly createCropUseCase: CreateCropUseCase,
    @inject('UpdateCropUseCase')
    private readonly updateCropUseCase: UpdateCropUseCase,
    @inject('DeleteCropUseCase')
    private readonly deleteCropUseCase: DeleteCropUseCase,
    @inject('GetCropUseCase')
    private readonly getCropUseCase: GetCropUseCase,
    @inject('ListCropsUseCase')
    private readonly listCropsUseCase: ListCropsUseCase,
  ) {}

  public async createCrop(req: Request, res: Response): Promise<Response> {
    try {
      const data = plainToClass(CreateCropDTO, req.body);
      await validateOrReject(data);
      const crop = await this.createCropUseCase.execute(data);
      return res.status(201).json(crop);
    } catch (error) {
      const { statusCode, body } = ErrorHandler.handle(error);
      return res.status(statusCode).json(body);
    }
  }

  public async updateCrop(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const data = plainToClass(UpdateCropDTO, req.body);
      await validateOrReject(data);
      const crop = await this.updateCropUseCase.execute(id, data);
      if (!crop) {
        return res.status(404).json({ message: 'Crop not found' });
      }
      return res.status(200).json(crop);
    } catch (error) {
      const { statusCode, body } = ErrorHandler.handle(error);
      return res.status(statusCode).json(body);
    }
  }

  public async deleteCrop(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const success = await this.deleteCropUseCase.execute(id);
      if (!success) {
        return res.status(404).json({ message: 'Crop not found' });
      }
      return res.status(200).json({ message: 'Crop deleted successfully' });
    } catch (error) {
      const { statusCode, body } = ErrorHandler.handle(error);
      return res.status(statusCode).json(body);
    }
  }

  public async getCrop(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const crop = await this.getCropUseCase.execute(id);
      if (!crop) {
        return res.status(404).json({ message: 'Crop not found' });
      }
      return res.status(200).json(crop);
    } catch (error) {
      const { statusCode, body } = ErrorHandler.handle(error);
      return res.status(statusCode).json(body);
    }
  }

  public async listCrops(req: Request, res: Response): Promise<Response> {
    try {
      const crops = await this.listCropsUseCase.execute();
      return res.status(200).json(crops);
    } catch (error) {
      const { statusCode, body } = ErrorHandler.handle(error);
      return res.status(statusCode).json(body);
    }
  }
}

export default CropController;
