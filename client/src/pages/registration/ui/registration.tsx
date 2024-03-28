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
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'

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

   const googleAuthButtonClick = async () => {
      try {
         const response = await axios.get(`http://localhost:5000/api/auth/google`, {
            withCredentials: true,
         })
         console.log(response)
         const userData = response.data
         console.log(userData.username)

         const isLoggedIn = await store.login(userData.username, userData.password)
         if (isLoggedIn) {
            navigate('/')
         } else {
            store.setIsError(true)
            setShowToast(true)
         }
      } catch (err) {
         console.error(err)
      }
   }

   function SplitEmail(email: string) {
      return email.split('@')[0]
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
                        <input type='submit' value='Зарегистрироваться' className={styles.registration_btn}></input>
                     </form>
                     <div className={styles.google_auth_btn}>
                        {/* <GoogleLogin
                           onSuccess={(credentialResponse) => {
                              if (credentialResponse.credential) {
                                 const credentialResponseDecoded = jwtDecode(credentialResponse.credential)

                                 if (!credentialResponseDecoded.email) {
                                    throw Error('issue with email')
                                 }

                                 const username = SplitEmail(credentialResponseDecoded.email)

                                 store
                                    .findOrCreate(username, 'qwerty1234', credentialResponseDecoded.email)
                                    .then(() => {
                                       navigate('/')
                                    })
                              }
                           }}
                           onError={() => {
                              console.error('Login Failed')
                           }}
                        /> */}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </AuthContext.Provider>
   )
})
