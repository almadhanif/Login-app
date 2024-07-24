import { Request } from 'express';

// Definisikan antarmuka AuthRequest yang memperluas Request
export interface AuthRequest extends Request {
  user?: any; // Ubah 'any' menjadi tipe data yang sesuai untuk user Anda
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
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };
    req.user = decoded.userId; // Menetapkan userId ke req.user
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;
