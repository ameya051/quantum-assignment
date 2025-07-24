import type { Request, Response } from 'express';

export const getHealth = (req: Request, res: Response) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'quantum-assignment-server'
  });
};

export const getRoot = (req: Request, res: Response) => {
  res.json({
    message: 'Express server is running!',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      users: '/api/users',
      dbStatus: '/api/db-status'
    }
  });
};
