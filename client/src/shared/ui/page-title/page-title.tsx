import { CSSProperties, FC } from 'react'

interface PageTitleProps {
   title: string
   style: CSSProperties
}

export const PageTitle: FC<PageTitleProps> = ({ title, style }) => {
   return <h2 style={{ ...style }}>{title}</h2>
}
