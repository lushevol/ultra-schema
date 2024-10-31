import { setupWorker } from 'msw/browser';
import { apiHandlers } from './apiHandlers';

export const worker = setupWorker();

worker.use(...apiHandlers);
