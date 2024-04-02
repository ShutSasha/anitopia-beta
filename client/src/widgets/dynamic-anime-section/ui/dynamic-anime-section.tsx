import { FC, ReactNode } from 'react'
import styles from './styles.module.scss'

type Props = {
   header_title: string
   children: ReactNode
}

export const DynamicAnimeSection: FC<Props> = ({ header_title, children }) => {
   return (
      <div className={styles.wrapper}>
         <div className={styles.header_container}>
            <p className={styles.header_title}>{header_title}</p>
         </div>
         <div>{children}</div>
      </div>
   )
}
