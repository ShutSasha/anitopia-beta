import { AiredEpisodesValidation, translateStatus } from './translateFetchData'
import shikimoriLogo from '../../../assets/shikimori_logo.png'
import imdbLogo from '../../../assets/imdb_logo.png'
import kinopoiskLogo from '../../../assets/kinopoisk_logopng.png'
import { replaceSpecificNames } from './replaceSpecificNames'

export const objSetAnimeState = (res: any) => {
   return {
      title: replaceSpecificNames(res.data.title),
      link: res.data.link,
      airedEpisodes: AiredEpisodesValidation(
         res.data.last_episode,
         res.data.material_data.episodes_aired,
         res.data.material_data.episodes_total,
         res.data.material_data.anime_status,
      ),
      posterURL: res.data.material_data.poster_url,
      screenshots: res.data.screenshots || res.data.material_data.screenshots,
      type:
         res.data.material_data.anime_kind === 'tv'
            ? 'ТВ Сериал'
            : res.data.material_data.anime_kind === 'tv_special'
              ? 'Спэшл'
              : res.data.material_data.anime_kind,
      status: translateStatus(res.data.material_data.anime_status),
      totalEpisodes: res.data.material_data.episodes_total,
      minimalAge: res.data.material_data.minimal_age,
      description: res.data.material_data.description,
      genres: res.data.material_data.anime_genres,
      year: res.data.year,
   }
}

export const arraySetRatings = (res: any) => {
   return [
      {
         rating: res.data.material_data.imdb_rating,
         logo: imdbLogo,
         height: '35px',
         width: '75px',
      },
      {
         rating: res.data.material_data.shikimori_rating,
         logo: shikimoriLogo,
         height: '25px',
         width: '25px',
      },
      {
         rating: res.data.material_data.kinopoisk_rating,
         logo: kinopoiskLogo,
         height: '25px',
         width: '25px',
      },
   ]
}
