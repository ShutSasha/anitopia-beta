import { FC } from 'react'
import styles from './styles.module.scss'
import background from './assets/profile-bg.png'

interface Props {
   maxWidth?: string
   height?: string
}

export const ProfileBgImg: FC<Props> = ({ maxWidth, height = '240px' }) => {
   return (
      <div style={{ maxWidth }}>
         <div style={{ height }} className={styles.background_wrapper}>
            <img className={styles.background_img} src={background} alt='' />
            <span className={styles.upload_user_bg_title}>Завантажити свій фон</span>
         </div>
      </div>
   )
}
