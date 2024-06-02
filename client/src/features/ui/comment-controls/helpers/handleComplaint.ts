import { handleFetchError, showNotice } from '@app/helpers/functions.tsx'
import { addUserComplaint } from '@shared/api/complaints/complaints.ts'

interface handleAddComplaintProps {
   from_user: string,
   to_user: string,
   category: string,
   setComplaintModal: (value: boolean) => void

}

export const handleComplaint = async ({ from_user, to_user, category, setComplaintModal }: handleAddComplaintProps) => {
   try {
      if (!category) {
         showNotice('Ви не вказали тип скарги', 'Помилка', 'error')
         return
      }
      await addUserComplaint({
         from_user,
         to_user,
         category,
      })
      showNotice('Скарга успішно додана', 'Повідомлення', 'success')
   } catch (e) {
      handleFetchError(e)
   } finally {
      setComplaintModal(false)
   }

}