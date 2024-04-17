import $api from '../../../app/http'

export const uploadImage = async (id: string, img: File,  checkUploadStatus: () => void) => {
   try {
      const formData = new FormData()
      formData.append('img', img)

      await $api.post(`/users/${id}/avatar`, formData)
      return setInterval(checkUploadStatus, 1000)
   } catch (error) {
      console.error('Error uploading image', error)
      throw error
   }
}
