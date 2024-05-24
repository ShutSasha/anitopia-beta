import { FC, useState } from 'react'
import styles from './styles.module.scss'
import { Notification } from '@shared/api'
import { handleFetchError, showNotice } from '@app/helpers/functions'
import { deleteNotification } from '@shared/api/notifications/notifications'

interface NotificationCardProps {
   notification: Notification
   onDelete: (id: string) => void
}

export const NotificationCard: FC<NotificationCardProps> = ({ notification, onDelete }) => {
   const [imageError, setImageError] = useState<boolean>(false)

   const handleImgError = () => {
      setImageError(true)
   }

   const handleDeleteNotification = async () => {
      try {
         await deleteNotification({ id: notification._id })
         showNotice('Успішно видалено повідомлення', 'Нове пвідомлення', 'success')
         onDelete(notification._id)
      } catch (e) {
         handleFetchError(e)
      }
   }

   return (
      <div className={styles.notification_card_container}>
         <button onClick={handleDeleteNotification} className={styles.btn_delete}></button>
         {notification.poster_url && !imageError && (
            <img
               className={styles.notification_poster}
               src={notification.poster_url}
               alt='poster'
               onError={handleImgError}
            />
         )}
         <div className={styles.notification_info_container}>
            <h2 className={styles.notification_title}>{notification.title}</h2>
            <p className={styles.notification_description}>{notification.description}</p>
            <p className={styles.notification_date}>{notification.timestamp}</p>
         </div>
      </div>
   )
}
