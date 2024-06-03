export interface NewsModel {
   _id: string
   user: string
   title: string
   type: NewType
   images: string[]
   timestamp: string
}

type NewType = 'Сайт' | 'Аніме'
