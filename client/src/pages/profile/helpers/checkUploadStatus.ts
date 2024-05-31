import { handleFetchError } from '@app/helpers/functions'
import $api from '../../../app/http'

export const checkUploadStatus = async (username: string) => {
   try {
      const { data } = await $api.get(`/users/upload-status/${username}`)
      const status = data.status

      if (status === undefined || status === null) return true

      return status
   } catch (e) {
      handleFetchError(e)
   }
}
