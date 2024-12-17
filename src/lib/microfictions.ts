import 'server-only'
import qs from 'qs'
import { notFound } from 'next/navigation'
import type {
  PinType,
  PinAttributesType,
  PinPhotosType,
} from '@/typescript/types'

export const CACHE_TAG_REUNION = 'reunions'
export const CMS_URL = process.env.CMS_URL

export async function GetMicroFictions() {
  const { data } = await fetchMF('api/microfictions')

  return {
    microfictions: data.map((item: PinType) => {
      const { attributes, id } = item
      let {
        createdAt,
        Date,
        Heure,
        ordre_de_lecture,
        pingenerator,
        GingkoBiloba,
        Texte_microfiction,
      }: PinAttributesType = attributes

      return {
        id,
        createdAt: createdAt,
        Date: Date,
        Heure: Heure,
        ordre_de_lecture: ordre_de_lecture,
        pingenerator: pingenerator,
        GingkoBiloba: GingkoBiloba,
        Texte_microfiction: Texte_microfiction.map(
          (elt: any) => elt.children[0].text
        ),
      }
    }),
  }
}

export async function GetPhotos() {
  const { data } = await fetchMF('api/photos')

  // console.log('DATA => ', await data)

  return {
    photosMF: data.map((item: PinType) => {
      // console.log('ITEM => ', item)
      const { attributes, id } = item
      let { createdAt, Texte_alternatif, Coordonnees, Source }: PinPhotosType =
        attributes

      let sourceMainImg = Source.data.attributes.formats.large
      let sourceThumbImg = Source.data.attributes.formats.thumbnail
      // console.log('sourceImg => ', sourceMainImg)

      return {
        id,
        createdAt: createdAt,
        Texte_alternatif: Texte_alternatif,
        Coordonnees: Coordonnees,
        sourceMainImg: sourceMainImg,
        sourceThumbImg: sourceThumbImg,

        // GingkoBiloba: GingkoBiloba,
        // Texte_microfiction: Texte_microfiction.map(
        //   (elt: any) => elt.children[0].text
        // ),
      }
    }),
  }
}

export async function fetchMF(reqApiEntryPoint: string) {
  const url = `${CMS_URL}/${reqApiEntryPoint}?populate=*`
  const response = await fetch(url)
  if (!response.ok) {
    if (response.status === 404) {
      notFound()
    }
    throw new Error(`CMS returned ${response.status} for ${url}`)
  }
  return await response.json()
}

