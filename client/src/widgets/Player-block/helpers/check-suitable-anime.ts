import { AnimeDataFromSearch } from '../models/models'

export const checkSuitableAnime = (animeData: AnimeDataFromSearch[], suitableTitle: string) => {
   const suitableAnime = animeData.find((anime) => anime.rus_name === suitableTitle)
   return suitableAnime
}
