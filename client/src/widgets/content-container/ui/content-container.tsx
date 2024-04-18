import { FC, ReactNode } from 'react'
import styles from './style.module.scss'

type Props = {
   children: ReactNode
   marginTop?: string
   padding?: string
   backgroundColor?: string
   borderBottom?: string
}

export const ContentContainer: FC<Props> = ({
   children,
   marginTop = '0',
   padding = '0',
   backgroundColor = 'none',
   borderBottom = 'none',
}) => {
   return (
      <div
         className={styles.container}
         style={{
            marginTop,
            padding,
            backgroundColor,
            borderBottom,
         }}
      >
         {children}
      </div>
   )
}
