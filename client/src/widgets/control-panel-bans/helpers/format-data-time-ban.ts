import dayjs, { Dayjs } from 'dayjs'

export const formatDateTime = (date: Dayjs | null, time: Dayjs | null) => {
   if (date && time) {
      return dayjs(date.format('YYYY-MM-DD') + 'T' + time.format('HH:mm:ss.SSS') + 'Z').toISOString()
   }
   return null
}
