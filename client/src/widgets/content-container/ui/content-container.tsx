import { CSSProperties, FC, ReactNode } from 'react'
import styles from './style.module.scss'

type Props = {
   children: ReactNode
   style?: CSSProperties
}

export const ContentContainer: FC<Props> = ({ children, style }) => {
   return (
      <div
         className={styles.container}
         style={{
            ...style,
         }}
      >
         {children}
      </div>
   )
}
