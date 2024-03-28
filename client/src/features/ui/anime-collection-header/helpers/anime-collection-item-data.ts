import eye_icon from '../assets/eye-icon.png'
import rate_star from '../assets/rate-star.png'

interface AnimeCollectionItemType {
   type: string
   icon: string
   text: string
}

export const AnimeCollectionItemData: AnimeCollectionItemType[] = [
   { type: 'rate', icon: rate_star, text: 'Оцінено' },
   { type: 'watching', icon: eye_icon, text: 'Дивлюсь' },
]
