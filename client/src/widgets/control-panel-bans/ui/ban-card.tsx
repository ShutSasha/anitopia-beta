import { UserByIdResponse } from '@shared/api'
import { FC } from 'react'
import styles from './ban_card.module.scss'

interface BanCardProps {
   user: UserByIdResponse
}

export const BanCard: FC<BanCardProps> = ({ user }) => {
   return (
      <div className={styles.card_container}>
         <div className={styles.user_container}>
            <img className={styles.user_img} src={user.avatarLink} alt='' />
            <p>{user.username}</p>
         </div>
         <div className={styles.complaint_count}></div>
         <div className={styles.category_of_complaint}></div>
         <div className={styles.past_bans_count}></div>
         <div className={styles.actions}></div>
      </div>
   )
}
