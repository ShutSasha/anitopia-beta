import { CSSProperties, FC } from 'react'
import styles from './styles.module.scss'
import { showNotice } from '@app/helpers/functions'

interface NotificationHeaderProps {
   style?: CSSProperties
   onDelete: () => void
}

export const NotificationHeader: FC<NotificationHeaderProps> = ({ style, onDelete }) => {
   const handleDeleteAllNotifications = () => {
      onDelete()
      showNotice('Успішно видалено всі повідомлення', 'Нове пвідомлення', 'success')
   }
   return (
      <div style={{ ...style }} className={styles.notification_container}>
         <h2 className={styles.notification_title}>Повідомлення</h2>
         <button onClick={handleDeleteAllNotifications} className={styles.delete_all_notifications_btn}></button>
      </div>
   )
}
