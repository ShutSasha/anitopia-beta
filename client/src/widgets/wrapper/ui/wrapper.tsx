import { FC, ReactNode } from 'react'
import styles from './style.module.scss'
import { useStore } from '@app/hooks/useStore'
import { observer } from 'mobx-react-lite'

type Props = {
   children: ReactNode
}

export const Wrapper: FC<Props> = observer(({ children }) => {
   const { store } = useStore()
   const { siteBackground } = store

   return (
      <div style={{ backgroundColor: siteBackground ? siteBackground : '#e2e2e2' }} className={styles.wrapper}>
         {children}
      </div>
   )
})
