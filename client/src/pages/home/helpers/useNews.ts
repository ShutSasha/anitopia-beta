import { useEffect, useState } from 'react'
import { NewsModel } from '@widgets/news-card/models/news-model.ts'
import { handleFetchError } from '@app/helpers/functions.tsx'
import $api from '@app/http'

export const useNews = (): { news: NewsModel[] } => {
   const [news, setNews] = useState<NewsModel[]>([])

   useEffect(() => {
      const fetchData = async () => {
         try {
            const { data } = await $api.get('/news')
            setNews(data)
         } catch (e) {
            handleFetchError(e)
         }
      }
      fetchData()
   }, [])

   return { news }
}
