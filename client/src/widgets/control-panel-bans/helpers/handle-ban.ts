import dayjs, { Dayjs } from 'dayjs'
import { AnitopiaServerError, handleFetchError, showNotice } from '@app/helpers/functions'
import { addBan } from '@shared/api/bans/bans'
import { formatDateTime } from './format-data-time-ban'

interface HandleBanProps {
   userId: string
   isPermanent: boolean
   startDate: Dayjs | null
   startTime: Dayjs | null
   endDate: Dayjs | null
   endTime: Dayjs | null
   setTemporaryModal: (value: boolean) => void
   setPermanentModal: (value: boolean) => void
}

export const handleBan = async ({
   userId,
   isPermanent,
   startDate,
   startTime,
   endDate,
   endTime,
   setTemporaryModal,
   setPermanentModal,
}: HandleBanProps) => {
   try {
      if (!isPermanent) {
         const start = formatDateTime(startDate, startTime)
         const end = formatDateTime(endDate, endTime)
         if (!start || !end) throw new AnitopiaServerError('Не вказано дату або час')
         await addBan({
            id: userId,
            is_permanent: false,
            reason: 'Тимчасове блокування',
            timestamp_from: start,
            timestamp_to: end,
         })
      } else {
         await addBan({
            id: userId,
            is_permanent: true,
            reason: 'Постійне блокування',
            timestamp_from: dayjs().toISOString(),
            timestamp_to: dayjs('2100-01-01').toISOString(),
         })
      }
      showNotice(isPermanent ? 'Користувач заблокований назавжди' : 'Користувач заблокований')
   } catch (e) {
      handleFetchError(e)
   } finally {
      if (isPermanent) {
         setPermanentModal(false)
      } else {
         setTemporaryModal(false)
      }
   }
}
