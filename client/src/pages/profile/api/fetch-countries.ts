import axios from 'axios'

export const fetchCountries = async () => {
   try {
      const response = await axios.get('https://restcountries.com/v3.1/all')
      const countriesNames = response.data.map(
         (country: any) => country.name.common,
      )
      return countriesNames
   } catch (error) {
      console.error('Ошибка при добавлении страны:', error)
      throw error
   }
}
