import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken'
import User, { IUser } from '../../models/Users';

interface DecodeToken {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const protect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  let token: string | undefined;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try{
      //getting token from the headbar
      token = req.headers.authorization.split(' ')[1];

      //verifying token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultsecret') as DecodeToken;

      // get user from the token
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch(error : unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        res.status(401).json({message: 'Not authorized, token failed'});
      } else {
        console.error('Unknown error');
      }
    }
  }

  if (!token) {
    res.status(401).json({message: 'Not authorized, no token'});
  }
}