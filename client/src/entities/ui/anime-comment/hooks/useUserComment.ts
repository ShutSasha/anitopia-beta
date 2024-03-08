import $api from '@app/http'
import { UserComment } from '@shared/api'
import { useEffect, useState } from 'react'

export const useUserComment = (user: string) => {
   const [userData, setUserData] = useState<UserComment>()

   useEffect(() => {
      const fetchUserData = async () => {
         try {
            const res = await $api.get(`/users/${user}`)
            console.log(res.data)
            setUserData(res.data)
         } catch (error) {
            console.error(error)
         }
      }
      fetchUserData()
   }, [])

   return userData
}
