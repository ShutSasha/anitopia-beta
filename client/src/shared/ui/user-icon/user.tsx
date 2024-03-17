import { FC, useContext, useEffect, useRef, useState } from 'react'
import { Context } from '../../../main'
import { observer } from 'mobx-react-lite'
import { Link, useNavigate } from 'react-router-dom'
import styles from './styles.module.scss'
import ProfileUserOptions from '../../../assets/profile-options-icon.svg'

export const User: FC = observer(() => {
   const { store } = useContext(Context)
   const [isActive, setActive] = useState<boolean>(false)
   const navigate = useNavigate()
   const optionsRef = useRef<HTMLDivElement>(null)

   const handleClickUserOptions = () => {
      setActive(!isActive)
   }

   const handleLogout = () => {
      store.logout()
      navigate('/login')
   }

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
            setActive(false)
         }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => {
         document.removeEventListener('mousedown', handleClickOutside)
      }
   }, [])

   return (
      <>
         <div className={styles.user_container}>
            <Link className={styles.user_link} title='Профіль' to={`/profile/${store.user.id}`}>
               <img className={styles.profile_img} src={store.user.avatarLink} alt='Profile' />
               <p>{store.user.username}</p>
            </Link>
            <div ref={optionsRef} className={styles.user_options} onClick={handleClickUserOptions}>
               <img src={ProfileUserOptions} alt='user-options' />
               <div
                  className={isActive ? `${styles.user_options_inner} ${styles.show}` : `${styles.user_options_inner}`}
               >
                  <ul className={styles.user_options_list}>
                     <li className={styles.user_option_item}>Колекція</li>
                     <li className={styles.user_option_item}>Налаштування</li>
                     <li className={styles.user_option_item} onClick={handleLogout}>
                        Вихід
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </>
   )
})
