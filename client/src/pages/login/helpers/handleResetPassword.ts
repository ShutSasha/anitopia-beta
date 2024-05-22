import { handleFetchError, showNotice } from '@app/helpers/functions.tsx'
import { resetPassword } from '@shared/api/auth/auth.ts'

export const handleResetPassword = async (email: string) => {
   try {
      console.log(email)
      if (!email) {
         showNotice('Ви не вказали пошту', 'Помилка', 'error')
         return
      }
      await resetPassword({ email })
      showNotice('Новий пароль надіслано на пошту', '(^･ω･^)ﾉ', 'success')
   } catch (e) {
      handleFetchError(e)
   }
}
