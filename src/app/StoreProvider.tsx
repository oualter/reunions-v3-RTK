'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../store'
import { persistStore } from 'redux-persist'
// const store = persistStore(makeStore())

export function Providers({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>(undefined)
  // let persistantStore = storeRef.current
  if (!storeRef.current) {
    storeRef.current = makeStore()
    // @ts-ignore
    // storeRef.current = persistStore(makeStore())
    console.log('storeRef.current => ', storeRef.current)
    console.log('makeStore() => ', makeStore())
  }
  return (
    // <Provider store={storeRef.current}>
    <Provider store={storeRef.current}>{children}</Provider>
  )
}
