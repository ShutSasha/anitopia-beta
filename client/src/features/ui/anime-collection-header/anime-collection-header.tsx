import { FC } from 'react'
import styles from './styles.module.scss'
import { observer } from 'mobx-react-lite'
import { AnimeCollectionItemData } from './helpers/anime-collection-item-data'
import { CollectionHeaderItem } from '../../../entities'

export const AnimeCollectionHeader: FC = observer(() => {
   return (
      <>
         <div className={styles.container}>
            <div className={styles.inner}>
               <ul className={styles.collection_header_list}>
                  {AnimeCollectionItemData.map((item) => (
                     <CollectionHeaderItem key={item.type} {...item} />
                  ))}
               </ul>
            </div>
         </div>
      </>
   )
})
