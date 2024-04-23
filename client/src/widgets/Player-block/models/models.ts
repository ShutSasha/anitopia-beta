export interface AnimeDataFromSearch {
   id: number
   rus_name: string
}

export interface Team {
   id: number
   name: string
}

export interface Quality {
   bitrate: number
   href: string
   quality: string
}

export interface Video {
   id: number
   quality: Quality[]
}

export interface Player {
   player: string
   team: Team
   video: Video
}

export interface Episode {
   id: number
   anime_id: number
   item_number: number
}
