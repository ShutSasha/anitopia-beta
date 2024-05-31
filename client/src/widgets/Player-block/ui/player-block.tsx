import { FC, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { useParams } from 'react-router-dom'
import { AnitopiaServerError, handleFetchError } from '@app/helpers/functions'
import { Episode, Player, Team, Video } from '../models/models'
import { PLAYER_JS_PATH } from '../consts/player-js-path'
import { ANILIB_UPLOAD_VIDEO_API } from '../consts/api'
import { findSuitableAnime } from '../helpers/find-suitable-anime'

const PLAYER_JS_URL =
   import.meta.env.VITE_NODE_ENV === 'production'
      ? import.meta.env.VITE_PLAYER_JS_URL_PRODUCTION
      : import.meta.env.VITE_PLAYER_JS_URL_DEVELOPMENT

interface PlayerProps {
   link: string
   width?: number
   height?: number
}

export const PlayerBlock: FC<PlayerProps> = ({ link, width = 1024, height = 576 }) => {
   const { id } = useParams()
   const [anilibLink, setAnilibLink] = useState<string>('')
   const [currentPlayer, setCurrentPlayer] = useState<'Anitopia' | 'Kodik'>('Anitopia')
   const [isLoadingPlayer, setIsLoadingPlayer] = useState<boolean>(true)
   const [playerPoster, setPlayerPoster] = useState<string>('')

   const [teams, setTeams] = useState<Team[]>([])
   const [selectedTeam, setSelectedTeam] = useState<Team>()
   const [players, setPlayers] = useState<Player[]>([])
   const [episodes, setEpisodes] = useState<Episode[]>([])
   const [currentEpisode, setCurrentEpisode] = useState<Episode>()

   useEffect(() => {
      const fetchAnime = async () => {
         try {
            setIsLoadingPlayer(true)

            const SuitableAnime = await findSuitableAnime(id, setPlayerPoster)

            if (!SuitableAnime) {
               setCurrentPlayer('Kodik')
               return
            }

            const titleId = SuitableAnime.id
            const episodes = await fetch(`https://api.lib.social/api/episodes?anime_id=${titleId}`)
               .then((res) => res.json())
               .then((res) => res.data)
            setEpisodes(episodes)

            if (episodes.length === 0) {
               setCurrentPlayer('Kodik')
               return
            }

            const firstEpisodeId = episodes[0].id
            const currentUserEpisode = localStorage.getItem('currentEpisode')

            if (currentUserEpisode) {
               const parsedEpisode = JSON.parse(currentUserEpisode)
               if (parsedEpisode.anime_id === episodes[0].anime_id) {
                  setCurrentEpisode(parsedEpisode)
               } else {
                  setCurrentEpisode(episodes[0])
               }
            }

            const episodeData = await fetch(`https://api.lib.social/api/episodes/${firstEpisodeId}?`)
               .then((res) => res.json())
               .then((res) => res.data.players)
            const animeLibPlayers: Player[] = episodeData.filter((player: Player) => player.player === 'Animelib')

            if (animeLibPlayers.length === 0) {
               setCurrentPlayer('Kodik')
               return
               // throw new AnitopiaServerError('Не знайдено Anitopia player для цього аніме')
            }

            setPlayers(animeLibPlayers)
            const player: Player = animeLibPlayers[0]
            const teams = animeLibPlayers.map((player: Player) => player.team)
            setTeams(teams)

            const selectedTeam = teams[0]
            setSelectedTeam(selectedTeam)
            const newAnilibVideo: Video = player.video
            const linksQuality = newAnilibVideo.quality
               .map((q) => `[${q.quality}]${ANILIB_UPLOAD_VIDEO_API}${q.href}`)
               .join(',\n')

            setAnilibLink(linksQuality)
         } catch (e) {
            setCurrentPlayer('Kodik')
            handleFetchError(e)
         } finally {
            setIsLoadingPlayer(false)
         }
      }
      fetchAnime()
   }, [])

   const handleSelectedTeam = (team: Team) => {
      try {
         setIsLoadingPlayer(true)
         setSelectedTeam(team)
         const player: Player | undefined = players.find((player) => player.team.name === team.name)
         if (!player) {
            setCurrentPlayer('Kodik')
            throw new AnitopiaServerError('Player not found')
         }
         const newAnilibVideo: Video = player.video
         const linksQuality = newAnilibVideo.quality
            .map((q) => `[${q.quality}]${ANILIB_UPLOAD_VIDEO_API}${q.href}`)
            .join(',\n')
         setAnilibLink(linksQuality)
      } catch (e) {
         handleFetchError(e)
      } finally {
         setIsLoadingPlayer(false)
      }
   }

   const handleSelectedEpisode = async (episode: Episode) => {
      try {
         setIsLoadingPlayer(true)
         const findEpisode = episodes.find((e) => e.id === episode.id)
         if (!findEpisode) throw new AnitopiaServerError('Episode not found')

         const episodeData = await fetch(`https://api.lib.social/api/episodes/${findEpisode.id}?`)
            .then((res) => res.json())
            .then((res) => res.data.players)

         setCurrentEpisode(findEpisode)
         localStorage.setItem('currentEpisode', JSON.stringify(findEpisode))
         const animeLibPlayers: Player[] = episodeData.filter((player: Player) => player.player === 'Animelib')
         setPlayers(animeLibPlayers)

         const player: Player = animeLibPlayers[0]

         if (!player) {
            setCurrentPlayer('Kodik')
            throw new AnitopiaServerError('Плеєр Anitopia для цього аніме не знайдено')
         }

         const teams = animeLibPlayers.map((player: Player) => player.team)
         setTeams(teams)

         const selectedTeam = teams[0]
         setSelectedTeam(selectedTeam)

         const newAnilibVideo: Video = player.video
         const linksQuality = newAnilibVideo.quality
            .map((q) => `[${q.quality}]${ANILIB_UPLOAD_VIDEO_API}${q.href}`)
            .join(',\n')

         setAnilibLink(linksQuality)
      } catch (e) {
         setCurrentPlayer('Kodik')
         handleFetchError(e)
      } finally {
         setIsLoadingPlayer(false)
      }
   }

   return (
      <div className={styles.player_container}>
         <div className={styles.player_inner}>
            <div className={styles.player_and_voices}>
               {isLoadingPlayer ? (
                  <div className={styles.player_loading}>Loading...</div>
               ) : (
                  <>
                     {anilibLink && currentPlayer === 'Anitopia' && (
                        <iframe
                           className={styles.playerJS}
                           src={`${PLAYER_JS_URL}${PLAYER_JS_PATH}?file=${anilibLink}&poster=${playerPoster}`}
                           width={width}
                           height={height}
                           allowFullScreen={true}
                        ></iframe>
                     )}
                     {currentPlayer === 'Kodik' && (
                        <iframe src={link} width={width} height={height} allow='autoplay *; fullscreen *'></iframe>
                     )}
                  </>
               )}
               <div className={styles.choose_player_container}>
                  <div className={styles.choose_player_buttons}>
                     {anilibLink && (
                        <button
                           onClick={() => setCurrentPlayer('Anitopia')}
                           className={`${styles.choose_player_button} ${currentPlayer === 'Anitopia' ? styles.choosen_player : ''}`}
                        >
                           Anitopia player
                        </button>
                     )}
                     <button
                        onClick={() => setCurrentPlayer('Kodik')}
                        className={`${styles.choose_player_button} ${currentPlayer === 'Kodik' ? styles.choosen_player : ''}`}
                     >
                        Kodik
                     </button>
                  </div>
                  <h2 className={styles.anime_voice_acting_title}>Озвучка</h2>
                  {teams && (
                     <div className={styles.anime_voice_acting_container}>
                        <div className={styles.anime_voice_acting_inner}>
                           {teams.map((team, index) => (
                              <button
                                 onClick={() => handleSelectedTeam(team)}
                                 className={`${team.name === selectedTeam?.name ? styles.selected_team : styles.anime_voice_acting_btn}`}
                                 key={index}
                              >
                                 {team.name}
                              </button>
                           ))}
                        </div>
                     </div>
                  )}
               </div>
            </div>
            <div className={styles.episodes_container}>
               {episodes &&
                  episodes.map((episode) => (
                     <div
                        onClick={() => handleSelectedEpisode(episode)}
                        className={`${currentEpisode?.id === episode.id ? styles.selected_episode : styles.episode_item}`}
                        key={episode.id}
                     >
                        {episode.item_number} Серія
                     </div>
                  ))}
            </div>
         </div>
      </div>
   )
}
