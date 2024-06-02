import { FC } from 'react'
import styles from './styles.module.scss'
import { useStore } from '@app/hooks/useStore'
import { observer } from 'mobx-react-lite'

export const AvatarUserSettings: FC = observer(() => {
   const { store } = useStore()

   return (
      <div className={styles.avatar_user_container}>
         <h2 className={styles.icon_title}>Іконка</h2>
         <div className={styles.image_container}>
            <img className={styles.profile_avatar_img} src={store.user.avatarLink} alt='Аватар користувача' />
            <span className={styles.upload_text}>Завантажити</span>
            <input name='img' type='file' accept='image/*' style={{ display: 'none' }} />
         </div>
      </div>
   )
})
