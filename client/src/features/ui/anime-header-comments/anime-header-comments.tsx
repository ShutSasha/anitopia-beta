import { FC } from 'react'
import styles from './styles.module.scss'
import { AnimeHeaderItem } from '../../../entities/ui/anime-header-item'

export const AnimeHeaderComments: FC = () => {
   return (
      <ul className={styles.container}>
         <AnimeHeaderItem />
      </ul>
   )
}
