export const formatDate = (date_string: string): string => {
   const months = [
      'Січень',
      'Лютий',
      'Березень',
      'Квітень',
      'Травень',
      'Червень',
      'Липень',
      'Серпень',
      'Вересень',
      'Жовтень',
      'Листопад',
      'Грудень',
   ]

   const date = new Date(date_string)

   const month = date.getUTCMonth()
   const year = date.getUTCFullYear()

   return `${months[month]} ${year}`
}
