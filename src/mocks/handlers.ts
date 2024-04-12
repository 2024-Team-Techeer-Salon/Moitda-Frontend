/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-extraneous-dependencies */
import { HttpResponse, http } from 'msw';

export const handlers = [
  http.get('/api/v1/tracks/track_id', () => HttpResponse.json({})),
];
