// 'use client'

import React from 'react'
import type { RootState } from '../../index'
import Link from 'next/link'
import Image from 'next/image'
import ginkgoBilobaLeaf from '@/assets/ginkgo-biloba-leaf.svg'
// import { useSelector, useDispatch } from 'react-redux'
import { useAppDispatch, useAppSelector } from '../../hooks'

export default function GinkgoList() {
  // @ts-ignore
  const mfGinkgoArray:number[] = useAppSelector(
    (state: RootState) => state.counterginkgo.microfictions
  )
//   console.log('mfGinkgoArray => ', mfGinkgoArray)
  return (
    <>
      {mfGinkgoArray.map((item, index) => {
        const isLastAdded = mfGinkgoArray.length === index + 1
        const isLastAddedClassName = isLastAdded ? 'lastAdded' : 'notLastAdded'
        return (
          <div key={item} className={isLastAddedClassName}>
            <Link href={`/microfiction/` + item}>
              <Image src={ginkgoBilobaLeaf} alt="*" width="25" height="25" />
            </Link>
          </div>
        )
      })}
    </>
  )
}
