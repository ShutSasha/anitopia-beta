import { Header } from '../../../widgets/header'
import styles from './styles.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { Loader, Toast } from '../../../shared'
import { InputAuth } from '../../../shared'
import { AuthContext } from '../context/AuthContenx'
import { getInputsData } from '../consts/input-data'
import { Context } from '../../../main'
import { observer } from 'mobx-react-lite'
import googleIcon from '../assets/google-icon.png'
export const Registration = observer(() => {
   const [username, setUsername] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [repeatPassword, setRepeatPassword] = useState('')
   const [showToast, setShowToast] = useState(false)
   const { store } = useContext(Context)
   const navigate = useNavigate()

   const inputsData = getInputsData(
      setUsername,
      setEmail,
      setPassword,
      setRepeatPassword,
   )

   const handleButtonClick = () => {
      store.setError('Пароли не совпадают!')
      setShowToast(true)
      store.setIsError(true)
   }

   const handleSubmit = (event: any) => {
      event.preventDefault()

      if (repeatPassword !== password) {
         handleButtonClick()
         return
      }

      store
         .registration(username, password, email)
         .then((isLoggedIn) => {
            if (isLoggedIn) {
               navigate('/')
            } else {
               setShowToast(true)
               store.setIsError(true)
            }
         })
         .catch((err) => console.error(err))
   }

   if (store.isLoading) {
      return <Loader />
   }

   return (
      <AuthContext.Provider
         value={{ setUsername, setEmail, setPassword, setRepeatPassword }}
      >
         {showToast && (
            <Toast
               message={store.messageError}
               duration={4000}
               isError={store.isError}
               clearIsError={() => store.setIsError(false)}
               onClose={() => setShowToast(false)}
            />
         )}
         <div className={styles.registration_wrapper}>
            <div className={styles.header}>
               <Header />
            </div>
            <div className={styles.container}>
               <div className={styles.wrapper}>
                  <div className={styles.form_box}>
                     <h2>Регистрация</h2>
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
                        <div className={styles.user_agreement}>
                           <label>
                              <input type='checkbox' />
                              <div className={styles.checkbox_icon}></div>
                              <p>
                                 Я согласен с
                                 <Link
                                    className={styles.user_agreement_span}
                                    to='/users-policy'
                                 >
                                    пользовательським соглашением
                                 </Link>
                              </p>
                           </label>
                        </div>
                        <input
                           type='submit'
                           value='Зарегистрироваться'
                           className={styles.registration_btn}
                        ></input>
                        <button className={styles.google_auth_btn}>
                           <img
                              className={styles.google_img}
                              src={googleIcon}
                              alt='Google-icon'
                           />
                        </button>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </AuthContext.Provider>
   )
})
