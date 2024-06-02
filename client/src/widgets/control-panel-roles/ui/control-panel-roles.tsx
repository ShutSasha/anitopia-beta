import { FC, useEffect, useState } from 'react'
import { Input } from 'antd'
import { ContentContainer } from '@widgets/content-container'
import { handleFetchError } from '@app/helpers/functions'
import $api from '@app/http'
import { getUsers } from '@shared/api/users/users'
import { UserByIdResponse } from '@shared/api'
import { UserRoleCard } from './user-role-card'
import styles from './styles.module.scss'

export const ControlPanelRoles: FC = () => {
   const [users, setUsers] = useState<UserByIdResponse[]>([])
   const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)

   useEffect(() => {
      const fetchUsers = async () => {
         try {
            const { data } = await getUsers(true)
            setUsers(data)
         } catch (e) {
            handleFetchError(e)
         }
      }
      fetchUsers()
   }, [])

   const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newSearchTerm = e.target.value

      if (timer) {
         clearTimeout(timer)
      }

      setTimer(
         setTimeout(async () => {
            try {
               const { data } = await $api.get('/users/search', { params: { query: newSearchTerm } })
               setUsers(data)
            } catch (error) {
               handleFetchError(error)
            }
         }, 500),
      )
   }

   return (
      <ContentContainer style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px' }}>
         <Input
            onChange={handleChangeSearch}
            placeholder={`Введіть ім'я користувача`}
            style={{ marginBottom: '10px' }}
         />
         <div className={styles.users_wrapper}>
            {users && users.map((user) => <UserRoleCard key={user._id} user={user} />)}
         </div>
      </ContentContainer>
   )
}
