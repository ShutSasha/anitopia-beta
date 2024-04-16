import $api from '../../../app/http'

export const uploadImage = async (id: string, img: File, username: string, checkUploadStatus: () => void) => {
   try {
      const formData = new FormData()
      formData.append('img', img)
      formData.append('username', username)

      await $api.post(`/users/${id}/avatar`, formData)
      return setInterval(checkUploadStatus, 1000)
   } catch (error) {
      console.error('Error uploading image', error)
      throw error
   }
}
