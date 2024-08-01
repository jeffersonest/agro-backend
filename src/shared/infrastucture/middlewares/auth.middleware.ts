import * as dotenv from 'dotenv';
dotenv.config();
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../../../modules/user/domain/user.entity';

const SECRET_KEY = process.env.JWT_SECRET ?? 'secret0123';

class AuthMiddleware {
  public async auth(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'Token is required' });
      }

      const decoded = jwt.verify(token, SECRET_KEY) as User;

      if (!decoded) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
}

export default new AuthMiddleware();
