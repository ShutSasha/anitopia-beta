import { FC } from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css' // Default theme
import { PosterSeasonCard } from '../../../entities'
import { Skeleton } from '../../../shared'
import { AnimeSeason } from '../../../pages/home/ui/page'

interface SpliderProps {
   animeSeasonData: AnimeSeason[]
}

export const Splider: FC<SpliderProps> = ({ animeSeasonData }) => {
   return (
      <div>
         {animeSeasonData.length > 0 ? (
            <Splide
               options={{
                  type: 'loop',
                  perMove: 2,
                  perPage: 6,
                  pagination: false,
               }}
            >
               {animeSeasonData &&
                  animeSeasonData.map((card: AnimeSeason) => (
                     <SplideSlide key={card.id}>
                        <PosterSeasonCard id={card.id} title={card.title} poster_url={card.poster_url} />
                     </SplideSlide>
                  ))}
            </Splide>
         ) : (
            <Skeleton width={1320} height={344} />
         )}
      </div>
   )
}
