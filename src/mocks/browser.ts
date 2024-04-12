/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);
