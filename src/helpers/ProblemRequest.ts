import { Response } from 'express';

export default function ProblemRequest(status: number, message: string, response: Response) {
  return response.status(status).json({
    message
  });
}