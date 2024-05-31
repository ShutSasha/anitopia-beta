import { observer } from 'mobx-react-lite'
import { FC, useContext, useEffect, useState } from 'react'
import { useStore } from '@app/hooks/useStore'
import { AnimeCollectionCard } from '../../../entities'
import $api from '../../../app/http'
import { useParams } from 'react-router-dom'

export interface Collection {
   rating?: number
   animeId: string
   shikimori_id: string
   poster_url: string
   title: string
}

export const AnimeCollectionInner: FC = observer(() => {
   const { store } = useStore()
   const [collection, setCollection] = useState<any[] | undefined>([])
   const { id } = useParams()

   useEffect(() => {
      const fetchData = async () => {
         try {
            let response
            if (store.userAnimeCollection.collectionType === 'rate') {
               response = await $api.get<Collection[]>(`/rate-anime/${id}`)
            } else if (store.userAnimeCollection.collectionType === 'watching') {
               //TODO Collections
            }

            setCollection(response?.data)
         } catch (error) {
            console.error(error)
         }
      }
      fetchData()
   }, [store.userAnimeCollection.collectionType, id])

   if (store.userAnimeCollection.collectionType === 'rate') {
      return <div>{collection && collection.map((item) => <AnimeCollectionCard key={item.animeId} {...item} />)}</div>
   }

   if (store.userAnimeCollection.collectionType === 'watching') {
      return <div>it's collection about watchig</div>
   }

   return (
      <>
         <div>smth went wrong</div>
      </>
   )
})
