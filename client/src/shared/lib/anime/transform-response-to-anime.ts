import { replaceSpecificAnimeTitles } from './replace-specific-anime-titles'

const translateAnimeKind = (animeKind: string) => {
   if (animeKind === 'tv') {
      return 'ТВ Серіал'
   }
   return 'Спешл'
}

const translateStatus = (statusAnime: string) => {
   const statuses: { [key: string]: string } = {
      released: 'Вийшов',
      ongoing: 'Онгоінг',
   }

   return statuses[statusAnime] || statusAnime
}

const AiredEpisodesValidation = (
   lastEpisode: number,
   episodesAired: number,
   totalEpisodes: number,
   statusAnime: string,
): number => {
   return statusAnime === 'released' ? totalEpisodes : episodesAired > lastEpisode ? episodesAired : lastEpisode
}

export const transformResponseToAnime = (res: any) => {
   const { id, title, link, last_episode, year, material_data } = res.data

   const {
      episodes_aired,
      episodes_total,
      anime_status,
      poster_url,
      anime_kind,
      minimal_age,
      description,
      anime_genres,
   } = material_data

   return {
      id: id,
      title: replaceSpecificAnimeTitles(title),
      link: link,
      airedEpisodes: AiredEpisodesValidation(last_episode, episodes_aired, episodes_total, anime_status),
      posterURL: poster_url,
      screenshots: res.data.screenshots || res.data.material_data.screenshots,
      type: translateAnimeKind(anime_kind),
      status: translateStatus(anime_status),
      totalEpisodes: episodes_total,
      minimalAge: minimal_age,
      description: description,
      genres: anime_genres,
      year: year,
      material_data: material_data || {},
   }
}
