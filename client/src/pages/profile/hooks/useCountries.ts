import { useEffect, useState } from "react"
import { fetchCountries } from "../api/fetch-countries"

export const useCountries = () =>{
   const [countryData, setCountryData] = useState<string[]>([])

   useEffect(() => {
      const fetchCountryData = async () => {
         try {
            const countries = await fetchCountries()
            setCountryData(countries)
         } catch (error) {
            console.error('Ошибка при получении данных о странах:', error)
         }
      }

      fetchCountryData()
   }, [])

   return countryData
}