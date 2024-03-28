import { FC } from 'react'
import styles from './styles.module.scss'
import background from './assets/profile-bg.png'
export const ProfileBgImg: FC = () => {
   return (
      <div>
         <div className={styles.background_wrapper}>
            <img className={styles.background_img} src={background} alt='' />
            <span className={styles.upload_user_bg_title}>Завантажити свій фон</span>
         </div>
      </div>
   )
}
