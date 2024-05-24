import { FC } from 'react'
import { User } from '../../../shared'
import styles from './styles.module.scss'
import { Link } from 'react-router-dom'
import NotificationIcon from '../../../assets/notification-icon.svg'
import { observer } from 'mobx-react-lite'
import { useStore } from '@app/hooks/useStore'

export const ProfileLogout: FC = observer(() => {
   const { store } = useStore()

   return (
      <div className={styles.user_logout_wrapper}>
         <Link to={`/notifications/${store.user.id}`}>
            <img src={NotificationIcon} alt='Notification' />
         </Link>
         <User />
      </div>
   )
})
