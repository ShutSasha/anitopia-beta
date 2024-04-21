import type { AxiosPromise } from 'axios'
import type { Anime, GetAnimeById } from './models'
import $api from '../../../app/http'

const BASE_URL = '/anime'

export const getAnimeById = ({ id, ...params }: GetAnimeById): AxiosPromise<Anime> => {
   return $api.get(`${BASE_URL}/${id}`, { params })
}

export const getUpdatedAnime = () => {
   return $api.get(`${BASE_URL}/updated`)
}

export const getReleasedAnimeLastMonth = () => {
   return $api.get(`${BASE_URL}/released`)
}

export const getAnimeSeason = () => {
   return $api.get(`${BASE_URL}/season`)
}

export const getCatalogAnime = ({ page, limit, query }: { page: number; limit: number; query: string }) => {
   return $api.get(`${BASE_URL}/list`, { params: { page, limit, query } })
}

// export const searchAnime = (query: string) => {
//    return $api.get(`${BASE_URL}/search`, { params: { query } })
// }
