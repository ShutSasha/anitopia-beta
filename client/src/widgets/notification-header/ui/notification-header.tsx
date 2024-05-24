import { CSSProperties, FC } from 'react'
import styles from './styles.module.scss'

interface NotificationHeaderProps {
   style?: CSSProperties
   onDelete: () => void
}

export const NotificationHeader: FC<NotificationHeaderProps> = ({ style, onDelete }) => {
   const handleDeleteAllNotifications = () => {
      onDelete()
   }

   return (
      <div style={{ ...style }} className={styles.notification_container}>
         <h2 className={styles.notification_title}>Повідомлення</h2>
         <button onClick={handleDeleteAllNotifications} className={styles.delete_all_notifications_btn}></button>
      </div>
   )
}
