import {
  type ListenerEffectAPI,
  type TypedAddListener,
  type TypedStartListening,
  addListener,
  configureStore,
  createAsyncThunk,
  createListenerMiddleware,
} from '@reduxjs/toolkit';
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';
import { baseApi } from '../rtk-query/baseApi';
import { aggridSlice } from './slices/aggrid';
import { dashboardSlice } from './slices/dashboard';
import { jsonSchemaFormSlice } from './slices/json-schema-form';
import { trackUsingSlice } from './slices/track-using';

const listenerMiddlewareInstance = createListenerMiddleware({
  onError: () => console.error,
});

const store = configureStore({
  reducer: {
    [aggridSlice.name]: aggridSlice.reducer,
    [dashboardSlice.name]: dashboardSlice.reducer,
    [jsonSchemaFormSlice.name]: jsonSchemaFormSlice.reducer,
    [trackUsingSlice.name]: trackUsingSlice.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (gDM) =>
    gDM()
      .prepend(listenerMiddlewareInstance.middleware)
      .concat(baseApi.middleware),
});

export { store };

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// @see https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
export type AppDispatch = typeof store.dispatch;

export type AppListenerEffectAPI = ListenerEffectAPI<RootState, AppDispatch>;

// @see https://redux-toolkit.js.org/api/createListenerMiddleware#typescript-usage
export type AppStartListening = TypedStartListening<RootState, AppDispatch>;
export type AppAddListener = TypedAddListener<RootState, AppDispatch>;

export const startAppListening =
  listenerMiddlewareInstance.startListening as AppStartListening;
export const addAppListener = addListener as AppAddListener;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
}>();
