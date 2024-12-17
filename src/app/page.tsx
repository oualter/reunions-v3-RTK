import ImagePlaceHolder from '@/components/ImagePlaceHolder'
import SideBar from '@/components/SideBar'
import PinsList from '@/components/PinsList'
import { Providers } from '@/StoreProvider'
import type { RootState } from '../store/index'
import { useSelector, useDispatch } from 'react-redux'
import CounterGinkgo from '../store/features/counterGinkgo/counterGinkgo'
import { GetMicroFictions } from '../lib/microfictions'

// export const dynamic = 'force-dynamic'

export default async function Home(props) {
  const microF = await GetMicroFictions()
  const { microfictions } = microF
  // await new Promise((resolve) => setTimeout(resolve, 1000))
  // const countGinkgo = useSelector((state: RootState) => state.counter.value)
  // console.log('countGinkgo => ', countGinkgo)

  return (
    <Providers>
      <section className="map-page relative flex">
        <article className="img-placeholder image-wrapper lg:w-[1080px] mx-auto relative mix-blend-darken ">
          <ImagePlaceHolder />
          <PinsList items={microfictions} />
        </article>
        <SideBar />
        <CounterGinkgo />
      </section>
    </Providers>
  )
}
