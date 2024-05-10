import { FC } from 'react'
import { AvatarUserSettings, CheckBox, ProfileBgImg, UserPersonalInfoForm } from '@features'
import { useParams } from 'react-router-dom'
import { useStore } from '@app/hooks/useStore'
import { handleEditUserInfo } from '../helpers/handleEditUserInfo'
import { ContentContainer } from '@widgets/content-container'
import { SelectUserFrame } from '@widgets/select-user-frame'
import styles from './styles.module.scss'

export const UserSettingsAccount: FC = () => {
   const { store } = useStore()
   const { id } = useParams()

   return (
      <>
         <ContentContainer
            style={{
               padding: '30px',
               backgroundColor: '#fff',
               borderBottom: '5px solid #ff6666',
            }}
         >
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
         </ContentContainer>
         <ContentContainer
            style={{
               padding: '30px',
               backgroundColor: '#fff',
               borderBottomLeftRadius: '10px',
               borderBottomRightRadius: '10px',
               marginBottom: '30px',
            }}
         >
            <SelectUserFrame />
         </ContentContainer>
      </>
   )
}
