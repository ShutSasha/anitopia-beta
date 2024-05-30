import { handleFetchError } from '@app/helpers/functions'
import $api from '../../../app/http'

export const uploadImage = async (id: string, img: File) => {
   try {
      const formData = new FormData()
      formData.append('img', img)

      await $api.post(`/users/${id}/avatar`, formData)
   } catch (e) {
      handleFetchError(e)
   }
}
