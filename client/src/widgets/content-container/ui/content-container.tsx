import { FC, ReactNode } from 'react'
import styles from './style.module.scss'

type Props = {
   children: ReactNode
   padding?: string
   backgroundColor?: string
}

export const ContentContainer: FC<Props> = ({ children, padding = '0', backgroundColor = 'none' }) => {
   return (
      <div
         className={styles.container}
         style={{
            padding,
            backgroundColor,
         }}
      >
         {children}
      </div>
   )
}
