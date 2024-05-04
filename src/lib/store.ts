/* eslint-disable import/no-named-as-default */
/* eslint-disable implicit-arrow-linebreak */
import { configureStore } from '@reduxjs/toolkit';
import exampleSlice from './features/exampleSlice.ts';

export const makeStore = () =>
  configureStore({
    reducer: {},
  });

export const exampleStore = () =>
  configureStore({
    reducer: {
      example: exampleSlice,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
