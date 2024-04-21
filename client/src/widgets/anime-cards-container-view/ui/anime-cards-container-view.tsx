import { AnimeCard } from '@entities/index'
import { FC } from 'react'
import styles from './styles.module.scss'
import { Anime } from 'pages/anime-list/ui/anime-list'
import { toJS } from 'mobx'

interface Props {
   animeData: Anime[]
}

export const AnimeCardsContainerView: FC<Props> = ({ animeData }) => {
   return (
      <ul className={styles.cards_container}>
         {animeData &&
            animeData.map((item, index) => (
               <li className={styles.card_container} key={index}>
                  <AnimeCard {...item} />
               </li>
            ))}
      </ul>
   )
}
