// 'use client'
// 'use server'
import {
  createAsyncThunk,
  createSlice,
  buildCreateSlice,
  asyncThunkCreator,
} from '@reduxjs/toolkit'
import { createAppSlice } from '../../hooks'

import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../index'
import { createAppAsyncThunk } from '../../../app/withTypes'
const CMS_URL = process.env.CMS_URL

// const { data } = await fetchMF('api/microfictions')
/*export const fetchPosts = await createAppAsyncThunk(
  'api/microfictions',
  // 'posts/fetchPosts',
  async () => {
    const url = `${CMS_URL}/api/microfictions`
    const response = await fetch(url)
    console.log('asyncThunk => ', await response.json())
    return await response.json()
  }
  // {
  //   condition(arg, thunkApi) {
  //     const postsStatus = selectPostsStatus(thunkApi.getState())
  //     if (postsStatus !== 'idle') {
  //       return false
  //     }
  //   },
  // }
)*/

export const fetchMicrofiction = createAsyncThunk(
  // `${CMS_URL}/api/microfictions`,
  'api/microfictions',
  (...arg) => {
    // (mfobj) => {
    console.log('fetchMicrofiction arg => ', arg)
    const url = `${CMS_URL}/api/microfictions`
    const asyncMF = fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify(mfobj),
    })
    // .then((res) => res.json())
    // .then((data) => data)
    // console.log('asyncMF => ', asyncMF)
    // return
  }
)

export interface CounterState {
  value: number
  status: 'idle' | 'loading' | 'failed' | 'success'
  id: string
  microfictions: {}
}

const initialState: CounterState = {
  value: 0,
  status: 'idle',
  id: undefined,
  microfictions: [],
}

export const counterGinkgoSlice = createAppSlice({
  name: 'counterginkgo',
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<string[]>) => {
      // increment: (state, action: PayloadAction<{ MFid: string }>) => {
      // @ts-ignore
      const isGinkgoAlreadyCounted = state.microfictions.includes(
        action.payload
      )
      if (!isGinkgoAlreadyCounted && action.payload) {
        // @ts-ignore
        state.microfictions = [...state.microfictions, action.payload]
        state.value += 1
      }
      // console.log('state.microfictions => ', state.microfictions)
      // console.log('state.value => ', state.value)
    },
    decrement: (state) => {
      state.value -= 1
    },
    superIncrement: (state) => {
      state.value += 10
    },
    // fetchMicro: create.asyncThunk(
    //   async (id: string, thunkApi) => {
    //     const res = await fetch(`myApi/todos?id=${id}`)
    //     return (await res.json())
    //   },
    //   {
    //     pending: (state) => {
    //       state.loading = true
    //     },
    //     rejected: (state, action) => {
    //       state.loading = false
    //     },
    //     fulfilled: (state, action) => {
    //       state.loading = false
    //       state.todos.push(action.payload)
    //     },
    //   }
    // ),
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(fetchPosts.pending, (state, action) => {
  //     state.status = 'pending'
  //   })
  // },
  extraReducers: (builder) => {
    // handle async action types
    builder.addCase(fetchMicrofiction.pending, (state) => {
      console.log('extraReducers pending')
      state.status = 'loading'
    })
    builder.addCase(fetchMicrofiction.rejected, (state) => {
      console.log('extraReducers rejected')
      state.status = 'failed'
    })
    builder.addCase(fetchMicrofiction.fulfilled, (state, action) => {
      console.log('extraReducers fullfilled')
      state.status = 'success'
      console.log('thunk reducer action => ', action)
      // return {...state, action.payload}
    })
    // [fetchMicrofiction.pending](state) {
    //   state.status = 'loading'
    // },
    // [fetchMicrofiction.fulfilled](state, action) {
    //   state.entities = action.payload
    //   state.status = 'idle'
  },
  // },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, superIncrement /*incrementByAmount*/ } =
  counterGinkgoSlice.actions

export default counterGinkgoSlice.reducer

export const selectGinkgoCount = (state: RootState) => state.counterginkgo.value
export const selectGinkgoStatus = (state: RootState) =>
  state.counterginkgo.status
