import { FC } from 'react'
import styles from './styles.module.scss'
import { AnimeCollectionHeader, AnimeCollectionInner } from '../../../features'

export const AnimeCollection: FC = () => {
   return (
      <div className={styles.anime_collection_container}>
         <AnimeCollectionHeader />
         <AnimeCollectionInner />
      </div>
   )
}
