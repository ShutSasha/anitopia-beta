import { FC, useContext } from 'react'
import { useStore } from '@app/hooks/useStore'
import { observer } from 'mobx-react-lite'
import styles from './styles.module.scss'
import { useNavigate } from 'react-router-dom'

export const Logout: FC = observer(() => {
   const { store } = useStore()
   const navigate = useNavigate()

   const handleLogout = () => {
      store.logout()
      navigate('/login')
   }

   return (
      <div title='Выход'>
         <button className={styles.btn} onClick={() => handleLogout()}></button>
      </div>
   )
})
