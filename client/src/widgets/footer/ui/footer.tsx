import { FC } from 'react'
import styles from './styles.module.scss'
import { Link } from 'react-router-dom'
import { SocialMediaList } from '../const/social-media-list'

export const Footer: FC = () => {
   return (
      <div className={styles.container}>
         <div className={styles.container_inner}>
            <div className={styles.social_media}>
               <h2 className={styles.social_media_title}>Наші соц.мережі</h2>
               <ul className={styles.social_media_list}>
                  {SocialMediaList.map((item) => (
                     <li key={item.link} className={styles.social_media_item}>
                        <Link target='_blank' to={item.link}>
                           <img src={item.logo} alt='' />
                        </Link>
                     </li>
                  ))}
               </ul>
               <h3 className={styles.anitopia_title}>Anitopia</h3>
               <p className={styles.social_media_text}>Усі відео на сайті надані тільки для ознайомлення.</p>
            </div>
            <div className={styles.website_info}>
               <h2 className={styles.website_info_title}>Інформація про сайт</h2>
               <Link className={styles.FAQ} to={`undefined`}>
                  FAQ
               </Link>
               <Link className={styles.user_agreement} to={`/users-policy`}>
                  Користувальницька угода
               </Link>
            </div>
            <div className={styles.support}>
               <h2 className={styles.support_title}>Технічна підтримка</h2>
               <Link className={styles.tg_chanel_dev} to={`https://t.me/anitopiahistory`}>
                  Канал розробки
               </Link>
               <p className={styles.email_support}>
                  Пошта для підримки: <Link to={`undefined`}>anitopia1test@gmail.com</Link>
               </p>
            </div>
         </div>
      </div>
   )
}
