import { FC, useContext } from 'react'
import { AvatarUserSettings, CheckBox, ProfileBgImg, UserPersonalInfoForm } from '@features'
import { useParams } from 'react-router-dom'
import { Context } from '../../../main'
import { handleEditUserInfo } from '../helpers/handleEditUserInfo'
import styles from './styles.module.scss'

export const UserSettingsAccount: FC = () => {
   const { store } = useContext(Context)
   const { id } = useParams()

   return (
      <>
         <div className={styles.user_avatar_and_background}>
            <AvatarUserSettings />
            <div>
               <h2 className={styles.background_title}>Задній фон користувача</h2>
               <ProfileBgImg maxWidth='874px' height='150px' />
            </div>
         </div>
         <UserPersonalInfoForm />
         <div className={styles.user_settigns_controls}>
            <CheckBox text='Приховати профіль користувача' />
            <button onClick={() => handleEditUserInfo(id, store)} className={styles.submit_edit_user_settings}>
               Редагувати
            </button>
         </div>
      </>
   )
}
