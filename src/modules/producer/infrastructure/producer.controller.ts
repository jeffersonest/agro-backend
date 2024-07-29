import { Request, Response } from 'express';

class ProducerController {
  public async createProducer(req: Request, res: Response): Promise<Response> {
    return res.status(200).json({ message: 'Producer created' });
  }
}

export default new ProducerController();
