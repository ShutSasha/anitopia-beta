import { AnitopiaServerError, handleFetchError, showNotice } from '@app/helpers/functions'
import { Notification } from '@shared/api'
import { deleteAllNotifications, getNotificationsByUserid } from '@shared/api/notifications/notifications'
import { Header } from '@widgets/header'
import { ContentContainer, Footer, Modal, NotificationCard, NotificationHeader, Wrapper } from '@widgets/index'
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './styles.module.scss'

export const Notifications: FC = () => {
   const { id } = useParams()
   const [notifications, setNotifications] = useState<Notification[]>([])
   const [isModalActive, setModalActive] = useState<boolean>(false)

   useEffect(() => {
      const fetchNotifications = async () => {
         try {
            if (!id) throw new AnitopiaServerError('User id is not provided')
            const { data } = await getNotificationsByUserid({ id })
            setNotifications(data)
         } catch (e) {
            handleFetchError(e)
         }
      }
      fetchNotifications()
   }, [])

   const removeNotificationFromState = (notificationId: string) => {
      setNotifications((prevNotifications) =>
         prevNotifications.filter((notification) => notification._id !== notificationId),
      )
   }

   const handleDeleteAllNotifications = async () => {
      try {
         if (!id) throw new AnitopiaServerError('User id is not provided')
         await deleteAllNotifications({ id })
         setNotifications([])
         setModalActive(false)
         showNotice('Успішно видалено всі повідомлення', 'Нове пвідомлення', 'success')
      } catch (e) {
         handleFetchError(e)
      }
   }

   return (
      <Wrapper>
         <Header />
         <ContentContainer
            style={{ backgroundColor: '#fff', marginTop: '25px', borderRadius: '10px', marginBottom: '20px' }}
         >
            <NotificationHeader onDelete={() => setModalActive(true)} />
            <ContentContainer style={{ padding: '25px 15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
               {notifications.map((notification) => (
                  <NotificationCard
                     key={notification._id}
                     notification={notification}
                     onDelete={removeNotificationFromState}
                  />
               ))}
            </ContentContainer>
         </ContentContainer>
         <Footer />
         <Modal
            modalWidth='30vw'
            headerTextSize='18px'
            active={isModalActive}
            setActive={setModalActive}
            headerText='Ви впевнені, що хочете видалити всі повідомлення?'
         >
            <div className={styles.modal_buttons}>
               <button onClick={handleDeleteAllNotifications} className={styles.modal_button_yes}>
                  Так
               </button>
               <button onClick={() => setModalActive(false)} className={styles.modal_button_no}>
                  Ні
               </button>
            </div>
         </Modal>
      </Wrapper>
   )
}
