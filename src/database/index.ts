import { setupWorker } from 'msw/browser';
import { cashflowGraphqlHandlers } from './business-table';

export const worker = setupWorker(...cashflowGraphqlHandlers);
