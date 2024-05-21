import { changePassword } from '@shared/api/users/users'
import { AnitopiaServerError, handleFetchError, showNotice } from '@app/helpers/functions'

export const handleChangePassword = async (
   id: string | undefined,
   oldPassword: string,
   newPassword: string,
   confirmPassword: string,
) => {
   try {
      if (!id) throw new AnitopiaServerError('Користувача не знайдено', 404)
      if (confirmPassword != newPassword) {
         showNotice('Паролі не спавпадають', 'Помилка', 'error')
         return
      }
      await changePassword({ id, oldPassword, newPassword })
      showNotice('Пароль успішно змінено', '(^･ω･^)ﾉ', 'success')
   } catch (e) {
      handleFetchError(e)
   }
}
