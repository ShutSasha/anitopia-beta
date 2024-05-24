import { FC } from 'react'
import { Header } from '@widgets/header'
import styles from './styles.module.scss'
import { useState } from 'react'
import { DefaultButton, InputAuth, Loader } from '../../../shared'
import { AuthContext } from '../context/AuthContext'
import { getInputsData } from '../consts/input-data'
import { useStore } from '@app/hooks/useStore'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import { Modal } from '@widgets/Modal'

import { handleResetPassword } from '../helpers/handleResetPassword.ts'

export const Login: FC = observer(() => {
   const { store } = useStore()
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [modal, setModalActive] = useState<boolean>(false)
   const [vefifyEmail, setVefifyEmail] = useState<string>('')
   const navigate = useNavigate()

   const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault()

      store
         .login(username, password)
         .then((isLoggedIn) => {
            if (isLoggedIn) {
               navigate('/')
            }
         })
         .catch((err) => console.error(err))
   }

   // const handleModalButton = async () => {
   //    try {
   //       const data = { email: vefifyEmail }
   //       const response = await axios.put(`http://localhost:5000/api/auth/rechange`, data)
   //       console.log(response.status)
   //    } catch (e) {
   //       console.error(e)
   //    }
   // }

   if (store.isLoading) {
      return <Loader />
   }

   if (store.isAuth) {
      navigate('/')
   }

   const inputsData = getInputsData(setUsername, setPassword)
   return (
      <AuthContext.Provider value={{ setUsername, setPassword }}>
         <div className={styles.registration_wrapper}>
            <div className={styles.header}>
               <Header />
            </div>
            <div className={styles.container}>
               <div className={styles.wrapper}>
                  <div className={styles.form_box}>
                     <h2>Вход</h2>
                     <form onSubmit={handleSubmit}>
                        {inputsData.map((item, index) => (
                           <InputAuth
                              labelColor={'white'}
                              key={index}
                              img={item.img}
                              setValue={item.setValue}
                              htmlFor={item.htmlFor}
                              type={item.type}
                              textLabel={item.textLabel}
                           />
                        ))}
                        <p
                           className={styles.form_text}
                           onClick={() => {
                              setModalActive(true)
                           }}
                        >
                           Забув пароль
                        </p>
                        <input type='submit' value='Войти' className={styles.registration_btn}></input>
                     </form>
                  </div>
               </div>
               <Modal active={modal} setActive={setModalActive} headerText={'Відновлення паролю'}>
                  <div className={styles.modal_wrapper}>
                     <div className={styles.modal_container}>
                        <p className={styles.modal_text}>
                           Для відновлення паролю вкажіть пошту на яку було зареєстровано акаунт
                        </p>
                        <InputAuth
                           img={null}
                           setValue={setVefifyEmail}
                           htmlFor={'username'}
                           type={'text'}
                           textLabel={'Електрона пошта'}
                           labelColor={'black'}
                        />
                        <DefaultButton
                           text={'Відправити'}
                           onClick={() => {
                              handleResetPassword(vefifyEmail)
                           }}
                        />
                     </div>
                  </div>
               </Modal>
            </div>
         </div>
      </AuthContext.Provider>
   )
})
