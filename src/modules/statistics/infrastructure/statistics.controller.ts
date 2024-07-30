import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import GetFarmCountUseCase from '../application/use-cases/get-farm-count.usecase';
import GetTotalHectaresUseCase from '../application/use-cases/get-total-hectares.usecase';
import GetPieChartByStateUseCase from '../application/use-cases/get-pie-chart-by-state.usecase';
import GetPieChartByCropUseCase from '../application/use-cases/get-pie-chart-by-crop.usecase';
import GetPieChartByLandUseUseCase from '../application/use-cases/get-pie-chart-by-land-use.usecase';

@injectable()
class StatisticsController {
  constructor(
    @inject('GetFarmCountUseCase')
    private getFarmCountUseCase: GetFarmCountUseCase,
    @inject('GetTotalHectaresUseCase')
    private getTotalHectaresUseCase: GetTotalHectaresUseCase,
    @inject('GetPieChartByStateUseCase')
    private getPieChartByStateUseCase: GetPieChartByStateUseCase,
    @inject('GetPieChartByCropUseCase')
    private getPieChartByCropUseCase: GetPieChartByCropUseCase,
    @inject('GetPieChartByLandUseUseCase')
    private getPieChartByLandUseUseCase: GetPieChartByLandUseUseCase,
  ) {}

  public async getFarmCount(req: Request, res: Response): Promise<Response> {
    const count = await this.getFarmCountUseCase.execute();
    return res.json({ count });
  }

  public async getTotalHectares(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const total = await this.getTotalHectaresUseCase.execute();
    return res.json({ total });
  }

  public async getPieChartByState(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const data = await this.getPieChartByStateUseCase.execute();
    return res.json(data);
  }

  public async getPieChartByCrop(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const data = await this.getPieChartByCropUseCase.execute();
    return res.json(data);
  }

  public async getPieChartByLandUse(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const data = await this.getPieChartByLandUseUseCase.execute();
    return res.json(data);
  }
}

export default StatisticsController;
