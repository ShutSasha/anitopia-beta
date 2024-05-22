import { FC } from 'react'
import styles from './styles.module.scss'
import { MainUserInfoProps } from '../../../widgets/main-user-info'
import { useStore } from '@app/hooks/useStore'
import { observer } from 'mobx-react-lite'
import { UserBadget } from '@shared/api'

export const AvatarUsernameProfile: FC<MainUserInfoProps> = observer(
   ({ user, handleClick, fileInputRef, handleImageChange }) => {
      const { store } = useStore()

      if (user._id === store.user.id) {
         return (
            <div className={styles.avatar_and_username}>
               <div className={styles.imageContainer} onClick={handleClick}>
                  <img className={styles.profile_avatar_img} src={user.avatarLink} alt='Avatar' />
                  <span className={styles.uploadText}>Завантажити</span>
                  <input
                     ref={fileInputRef}
                     name='img'
                     type='file'
                     accept='image/*'
                     onChange={handleImageChange}
                     style={{ display: 'none' }}
                  />
               </div>
               <h2 className={styles.title_username}>{user.username}</h2>
               <div className={styles.badge_list}>
                  {user.roles.map((role: UserBadget, index: number) => (
                     <div key={index} className={`${styles.badge} ${styles[role]}`}>
                        {role}
                     </div>
                  ))}
               </div>
            </div>
         )
      }

      return (
         <div className={styles.avatar_and_username}>
            <div className={styles.imageContainerAnotherUser}>
               <img className={styles.profile_avatar_img} src={user.avatarLink} alt='Avatar' />
            </div>
            <h2 className={styles.title_username}>{user.username}</h2>
         </div>
      )
   },
)
