import { setupWorker } from 'msw/browser';
import { apiHandlers } from './apiHandlers';
import { graphqlHandlers } from './graphqlHandlers';

export const worker = setupWorker();

worker.use(...[...apiHandlers, ...graphqlHandlers]);
