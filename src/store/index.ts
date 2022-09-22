import { configureStore } from '@reduxjs/toolkit';
import flightStore from './flightStore';
export const store = configureStore({
  reducer: {
    flight: flightStore,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
