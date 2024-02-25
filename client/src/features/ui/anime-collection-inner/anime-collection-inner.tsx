import { observer } from 'mobx-react-lite'
import { FC, useContext } from 'react'
import { Context } from '../../../main'

export const AnimeCollectionInner: FC = observer(() => {
   const { store } = useContext(Context)
   console.log(store.userAnimeCollection.collectionType)
   console.log(store.user.animeRatings[0].rating)

   if (store.userAnimeCollection.collectionType === 'rate') {
      return (
         <div>
            {store.user.animeRatings.map((item) => (
               <div className='card'>
                  anime rating: {item.rating} of anime {item.animeId}
               </div>
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
