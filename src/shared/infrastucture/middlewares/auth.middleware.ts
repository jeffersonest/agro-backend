import { Request, Response } from 'express';

class AuthMiddleware {
  public async auth(req: Request, res: Response) {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ message: 'Token is required' });
      }
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
}

export default new AuthMiddleware();
