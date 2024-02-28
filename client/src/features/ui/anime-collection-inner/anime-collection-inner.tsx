import { observer } from 'mobx-react-lite'
import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../../../main'
import { AnimeCollectionCard } from '../../../entities'
import $api from '../../../app/http'

export interface Collection {
   rating?: number
   animeId: string
   poster_url: string
   title: string
}

export const AnimeCollectionInner: FC = observer(() => {
   const { store } = useContext(Context)
   const [collection, setCollection] = useState<any[] | undefined>([])

   useEffect(() => {
      const fetchData = async () => {
         try {
            let response
            if (store.userAnimeCollection.collectionType === 'rate') {
               response = await $api.get<Collection[]>(
                  `/rate-anime/${store.user.id}`,
               )
               console.log(response)
            } else if (
               store.userAnimeCollection.collectionType === 'watching'
            ) {
            }

            setCollection(response?.data)
         } catch (error) {
            console.error(error)
         }
      }
      fetchData()
   }, [store.userAnimeCollection.collectionType])

   if (store.userAnimeCollection.collectionType === 'rate') {
      return (
         <div>
            {collection &&
               collection.map((item) => (
                  <AnimeCollectionCard key={item.animeId} {...item} />
               ))}
         </div>
      )
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
