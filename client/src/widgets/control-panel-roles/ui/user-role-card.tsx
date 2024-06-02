import { UserByIdResponse } from '@shared/api'
import { FC, useState } from 'react'
import styles from './card.module.scss'
import { handleFetchError, showNotice } from '@app/helpers/functions'
import $api from '@app/http'

interface UserRoleCardProps {
   user: UserByIdResponse
}

export const UserRoleCard: FC<UserRoleCardProps> = ({ user }) => {
   const [isModerator, setIsModerator] = useState<boolean>(user.roles.includes('MODERATOR'))

   const handleAddRole = async () => {
      try {
         await $api.post(`/users/roles/${user._id}`, { role: 'MODERATOR' })
         showNotice('success', 'Роль модератора надана')
         setIsModerator(true)
      } catch (e) {
         handleFetchError(e)
      }
   }

   const handleTakeOutRole = async () => {
      try {
         await $api.delete(`/users/roles/${user._id}`, { data: { role: 'MODERATOR' } })
         showNotice('success', 'Роль модератора віднята')
         setIsModerator(false)
      } catch (e) {
         handleFetchError(e)
      }
   }

   return (
      <div className={styles.container}>
         <img className={styles.avatar} src={user.avatarLink} alt='' />
         <div className={styles.username}>
            {user.username} {isModerator && <span className={styles.moderator}>Модератор</span>}
         </div>
         <div className={styles.actions}>
            <div onClick={handleAddRole} className={styles.give_role}>
               <img className={styles.add_role_img} src='/admin-panel/add-role.svg' alt='' />
               <p className={styles.add_role_text}>Надати роль модератора</p>
            </div>
            <div onClick={handleTakeOutRole} className={styles.take_out_role}>
               <img className={styles.take_out_role_img} src='/admin-panel/take-out-role.svg' alt='' />
               <p className={styles.take_out_role_text}>Відняти роль модератора</p>
            </div>
         </div>
      </div>
   )
}
