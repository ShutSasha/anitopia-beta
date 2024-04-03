import { FC, ReactNode } from 'react'
import styles from './style.module.scss'

type Props = {
   children: ReactNode
}

export const Wrapper: FC<Props> = ({ children }) => {
   return <div className={styles.wrapper}>{children}</div>
}
