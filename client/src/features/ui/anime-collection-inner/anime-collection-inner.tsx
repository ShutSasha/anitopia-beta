import { observer } from 'mobx-react-lite'
import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../../../main'
import axios from 'axios'
import { AnimeCollectionCard } from '../../../entities'

export interface Collection {
   rating?: number
   animeId: string
   poster_url: string
   title: string
}

export const AnimeCollectionInner: FC = observer(() => {
   const { store } = useContext(Context)
   const [collection, setCollection] = useState<any[] | undefined>([])

   const headers = {
      Authorization: `Bearer ${localStorage.getItem(`token`)}`,
   }

   useEffect(() => {
      const fetchData = async () => {
         try {
            let response
            if (store.userAnimeCollection.collectionType === 'rate') {
               response = await axios.get<Collection[]>(
                  `http://localhost:5000/api/rate-anime/${store.user.id}`,
                  { headers },
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
