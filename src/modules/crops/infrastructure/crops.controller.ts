import { Request, Response } from 'express';

class CropsController {
  public async list(req: Request, res: Response): Promise<Response> {
    return res.status(200).json({ message: 'Crops listed' });
  }
}

export default new CropsController();
