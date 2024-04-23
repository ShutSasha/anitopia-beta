import { SPECIFIC_ANIME_TITLES } from './consts/specific-anime-titles'

export const replaceSpecificAnimeTitles = (nameAnime: string) => {
   const replacedName = nameAnime
      .split(' ')
      .map((item) => {
         const foundSpecificName = SPECIFIC_ANIME_TITLES.find((specificName) => Object.keys(specificName)[0] === item)
         return foundSpecificName ? Object.values(foundSpecificName)[0] : item
      })
      .join(' ')

   return replacedName !== nameAnime ? replacedName : nameAnime
}
