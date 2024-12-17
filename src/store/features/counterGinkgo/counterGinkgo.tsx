'use client'

import React from 'react'
import type { RootState } from '../../index'
// import { useSelector, useDispatch } from 'react-redux'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { decrement, increment, selectGinkgoCount } from './counterGinkgoSlice'
import GinkgoList from './ginkgoList'

export default function CounterGinkgo() {
  // const count2 = useAppSelector((state: RootState) => state.counterginkgo.value)
  const ginkgoCount = useAppSelector((state) => selectGinkgoCount(state))

  const dispatch = useAppDispatch()

  return (
    <div id="ginkgo-counter">
      {/* <button
        aria-label="Increment value"
        className="border border-sky-500"
        onClick={() => dispatch(increment())}
      >
        +
      </button> */}
      {/* <div>Compteur de ginkgos</div> */}
      <div className="ginkgo-counter-wrapper">
        <span className="">{ginkgoCount}</span> ginkgos / 12
        <div className="flex gap-2">
          <GinkgoList />
        </div>
      </div>
      <div className="mt-6">x microfictions parcourues</div>
      {/* <button
        aria-label="Decrement value"
        onClick={() => dispatch(decrement())}
      >
        -
      </button> */}
    </div>
  )
}
