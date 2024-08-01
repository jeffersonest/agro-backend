import User from '../src/modules/user/domain/user.entity';
declare module 'express' {
  export interface Request {
    user?: User;
  }
}
