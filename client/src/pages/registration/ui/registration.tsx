import { Header } from '../../../widgets/header'
import styles from './styles.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { Loader, Toast } from '@shared/index'
import { InputAuth } from '@shared/index'
import { AuthContext } from '../context/AuthContenx'
import { getInputsData } from '../consts/input-data'
import { Context } from '../../../main'
import { observer } from 'mobx-react-lite'
import axios from 'axios'
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { getUserData } from '../api/get-user-data.ts'

export const Registration = observer(() => {
   const [username, setUsername] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [repeatPassword, setRepeatPassword] = useState('')
   const [showToast, setShowToast] = useState(false)
   const { store } = useContext(Context)

   const inputsData = getInputsData(setUsername, setEmail, setPassword, setRepeatPassword)
   const navigate = useNavigate()
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
         .registration(username, password, email, null)
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

   function SplitEmail(email: string) {
      return email.split('@')[0]
   }

   const login = useGoogleLogin({
      onSuccess: async (tokenResponse) => {
         try {
            const res = await getUserData(tokenResponse)

            const username = SplitEmail(res.email)
            console.log(res)
            store.findOrCreate(username, 'qwerty1234', res.email, res.picture).then(() => {
               navigate('/')
            })
         } catch (e) {
            console.log(e)
         }
      },
   })

   return (
      <AuthContext.Provider value={{ setUsername, setEmail, setPassword, setRepeatPassword }}>
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
            <Header />
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
                                 Я згоден з
                                 <Link className={styles.user_agreement_span} to='/users-policy'>
                                    &nbsp;користувальницькою угодою
                                 </Link>
                              </p>
                           </label>
                        </div>
                        <div className={styles.btn_container}>
                           <input type='submit' value='Зарегистрироваться' className={styles.registration_btn}></input>
                        </div>
                     </form>
                     <button className={styles.google_auth_btn} onClick={() => login()}>
                        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48' width='20px' height='20px'>
                           <path
                              fill='#FFC107'
                              d='M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z'
                           />
                           <path
                              fill='#FF3D00'
                              d='M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z'
                           />
                           <path
                              fill='#4CAF50'
                              d='M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z'
                           />
                           <path
                              fill='#1976D2'
                              d='M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z'
                           />
                        </svg>
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </AuthContext.Provider>
   )
})
