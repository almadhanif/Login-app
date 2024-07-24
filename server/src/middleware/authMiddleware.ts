import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: any;
}

// Middleware untuk otentikasi dan menambahkan user ke req.user
import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded; // Menetapkan userId ke req.user
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;
