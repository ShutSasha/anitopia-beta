import { FC, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { fetchUsersForControlPanel } from '../helpers/fetch-users-for-control-panel'
import { UserByIdResponse } from '@shared/api'
import { BanCard } from './ban-card'
import { Loader } from '@shared/index'

export const ControlPanelBans: FC = () => {
   const [users, setUsers] = useState<UserByIdResponse[] | undefined>([])

   useEffect(() => {
      const fetchUsers = async () => {
         const users = await fetchUsersForControlPanel()
         setUsers(users)
      }
      fetchUsers()
   }, [])

   return (
      <>
         <div className={styles.bans_header}>
            <div className={styles.bans_header_item}>Користувач</div>
            <div className={styles.bans_header_item}>Кількість скарг</div>
            <div className={styles.bans_header_item}>Категорія</div>
            <div className={styles.bans_header_item}>Минулі блокування</div>
            <div className={styles.bans_header_item}>Дії</div>
         </div>
         <div className={styles.users_list}>{users && users.map((user) => <BanCard key={user._id} user={user} />)}</div>
      </>
   )
}
