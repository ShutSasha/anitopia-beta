interface Complaint {
   category: string
}

export const getMostFrequentCategory = (data: Complaint[]): string => {
   const categoryCounts = data.reduce((acc: Record<string, number>, complaint: Complaint) => {
      const complaintCategory = complaint.category
      if (acc[complaintCategory]) {
         acc[complaintCategory]++
      } else {
         acc[complaintCategory] = 1
      }
      return acc
   }, {})

   const mostFrequentCategory = Object.keys(categoryCounts).reduce(
      (a, b) => (categoryCounts[a] > categoryCounts[b] ? a : b),
      'Немає',
   )

   return mostFrequentCategory
}
