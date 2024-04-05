import { FC } from 'react'
import styles from './styles.module.scss'
import { AvatarUserSettings, ProfileBgImg } from '@features'
import TextField from '@mui/material/TextField'
import { CountrySelectMUI } from '@shared/ui/country-select-mui'
import { AboutMeField } from '@entities/index'

export const UserSettingsAccount: FC = () => {
   return (
      <>
         <div className={styles.user_avatar_and_background}>
            <AvatarUserSettings />
            <div>
               <h2 className={styles.background_title}>Задній фон користувача</h2>
               <ProfileBgImg maxWidth='874px' height='150px' />
            </div>
         </div>
         <div className={styles.user_personal_container}>
            <div className={styles.user_personal_inputs}>
               <TextField label={`Ім'я`} variant='standard' />
               <TextField label={`Прізвище`} variant='standard' />
               <TextField label={`Вік`} variant='standard' />
               <TextField label={`Стать`} variant='standard' />
               <CountrySelectMUI />
            </div>
            <AboutMeField />
         </div>
         <div className={styles.user_settigns_controls}>
            <div className={styles.user_agreement}>
               <label>
                  <input type='checkbox' />
                  <div className={styles.checkbox_icon}></div>
                  <p>Приховати профіль користувача</p>
               </label>
            </div>
            <button className={styles.submit_edit_user_settings}>Редагувати</button>
         </div>
      </>
   )
}
