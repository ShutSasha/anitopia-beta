import { handleFetchError } from '@app/helpers/functions'
import { getUsers } from '@shared/api/users/users'

export const fetchUsersForControlPanel = async () => {
   try {
      const { data } = await getUsers(true)
      return data
   } catch (e) {
      handleFetchError(e)
   }
}
