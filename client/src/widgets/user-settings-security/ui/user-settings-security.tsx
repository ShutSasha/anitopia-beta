import { ContentContainer } from '@widgets/content-container'
import { FC, useState } from 'react'
import styles from './styles.module.scss'
import { TextField } from '@mui/material'
import { showNotice } from '@app/helpers/functions'
import { useParams } from 'react-router-dom'
import { handleChangePassword } from '@widgets/user-settings-security/helpers/handleChangePassword.ts'

export const UserSettingsSecurity: FC = () => {
   const [currentPasswords, setCurrentPasswords] = useState<string>('')
   const [newPasswords, setNewPasswords] = useState<string>('')
   const [confirmPasswords, setConfirmPasswords] = useState<string>('')

   const { id } = useParams()

   // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
   //    event.preventDefault()
   //    showNotice('success', 'Пароль успішно змінено')
   // }

   return (
      <ContentContainer
         style={{
            padding: '30px',
            backgroundColor: '#fff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            borderBottomLeftRadius: '10px',
            borderBottomRightRadius: '10px',
            marginBottom: '30px',
         }}
      >
         <h2 className={styles.security_title}>Зміна паролю</h2>
         <form
            onSubmit={(e) => {
               e.preventDefault()
               handleChangePassword(id, currentPasswords, newPasswords)
            }}
            className={styles.change_password_form}
         >
            <h2 className={styles.current_password_title}>Поточний пароль</h2>
            <TextField
               type='password'
               value={currentPasswords}
               onChange={(event) => setCurrentPasswords(event.target.value)}
               label={`Поточний пароль`}
               variant='standard'
               sx={{ marginBottom: '30px' }}
            />
            <h2 className={styles.current_password_title}>Новий пароль</h2>
            <TextField
               type='password'
               value={newPasswords}
               onChange={(event) => setNewPasswords(event.target.value)}
               label={`Новий пароль`}
               variant='standard'
               sx={{ marginBottom: '30px' }}
            />
            <TextField
               type='password'
               value={confirmPasswords}
               onChange={(event) => setConfirmPasswords(event.target.value)}
               label={`Підтвердіть пароль`}
               variant='standard'
               sx={{ marginBottom: '30px' }}
            />
            <button className={styles.btn} type='submit'>
               Змінити пароль
            </button>
         </form>
      </ContentContainer>
   )
}
