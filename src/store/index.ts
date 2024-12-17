'use client'
import type { Action, ThunkAction } from '@reduxjs/toolkit'
import { createRoot } from 'react-dom/client'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import counterGinkgoReducer from './features/counterGinkgo/counterGinkgoSlice'
// import mfListReducer from './features/counterGinkgo/counterGinkgoSlice'

// export const store = configureStore({
//   reducer: { counterginkgo: counterGinkgoReducer },
// })

const persistConfig = {
  // key: 'root',
  key: 'counterginkgo',
  storage: storage,
  whitelist: ['microfictions'],
}
const persistedReducer = persistReducer(persistConfig, counterGinkgoReducer)
// const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  // reducer: { counterginkgo: counterGinkgoReducer },
  // reducer: persistedReducer,
  reducer: { counterginkgo: persistedReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
      serializableCheck: false,
    }),
})

export const makeStore = () => {
  return store
  // return persistStore(store)
}

// export const persistingStore = persistStore(store)

// @ts-ignore
// export type AppStore = ReturnType<typeof store>
export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
