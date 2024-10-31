import { setupWorker } from 'msw/browser';
import { cashflowGraphqlHandlers } from '../business-table';
import { apiHandlers } from './apiHandlers';

export const worker = setupWorker();

worker.use(...cashflowGraphqlHandlers);
worker.use(...apiHandlers);
