import { Request, Response } from 'express';
import { ApiError } from '../utils/apiError';

export const notFoundHandler = (req: Request, res: Response) => {
  throw new ApiError(404, 'Resource not found');
};