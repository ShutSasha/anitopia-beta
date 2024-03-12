import { FC } from 'react'
import { User } from '../../../shared'
import { Logout } from '../../../shared'
import styles from './styles.module.scss'
import { Link } from 'react-router-dom'
import NotificationIcon from '../../../assets/notification-icon.svg'
import { observer } from 'mobx-react-lite'

export const ProfileLogout: FC = observer(() => {
   return (
      <div className={styles.user_logout_wrapper}>
         <Link to='/notifications'>
            <img src={NotificationIcon} alt='Notification' />
         </Link>
         <User />
      </div>
   )
})
