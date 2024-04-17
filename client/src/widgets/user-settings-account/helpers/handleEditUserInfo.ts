import { editUserPersonalInfo } from '@shared/api/users/users'
import { AnitopiaServerError, handleFetchError, showNotice } from '@app/helpers/functions'
import Store from '@app/store/store'

export const handleEditUserInfo = async (id: string | undefined, store: Store) => {
   try {
      if (!id) throw new AnitopiaServerError('Користувача не знайдено', 404)
      const { firstName, lastName, country, sex, age } = store.userPersonalData
      await editUserPersonalInfo({ id, firstName, lastName, country, sex, age })
      showNotice('Профіль успішно відредаговано', '(^･ω･^)ﾉ', 'success')
   } catch (e) {
      handleFetchError(e)
   }
}
