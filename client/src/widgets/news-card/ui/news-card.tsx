import React, { FC } from 'react'
import { NewsModel } from '@widgets/news-card/models/news-model.ts'
import styles from './styles.module.scss'
import { formatDate } from '../helpers/format-date-by-ukr-month'

interface Props {
   news_card: NewsModel
}

export const NewsCard: FC<Props> = ({ news_card }) => {
   return (
      <div className={styles.card_container}>
         <div className={styles.timestamp}>{formatDate(news_card.timestamp)}</div>
         <div className={styles.card_body}>
            <div className={`${styles.news_type} ${news_card.type === 'Сайт' ? styles.site_type : styles.anime_type}`}>
               {news_card.type}
            </div>
            <h2 className={styles.news_title}>{news_card.title}</h2>
         </div>
      </div>
   )
}
