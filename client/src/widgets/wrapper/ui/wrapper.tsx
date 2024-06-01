import { FC, ReactNode, useEffect } from 'react'
import styles from './style.module.scss'
import { useStore } from '@app/hooks/useStore'
import { observer } from 'mobx-react-lite'
import { handleFetchError } from '@app/helpers/functions'
import $api from '@app/http'

type Props = {
   children: ReactNode
}

export const Wrapper: FC<Props> = observer(({ children }) => {
   const { store } = useStore()
   const { siteBackground } = store

   useEffect(() => {
      const fetchBackground = async () => {
         try {
            const { data } = await $api.get(`/users/site-background/${store.user.id}`)
            store.setSiteBackground(data.siteBackgroundColor)
         } catch (e) {
            handleFetchError(e)
         }
      }
      if (store.user.id) fetchBackground()
   }, [siteBackground])

   return (
      <div style={{ backgroundColor: siteBackground ? siteBackground : '#e2e2e2' }} className={styles.wrapper}>
         {children}
      </div>
   )
})
