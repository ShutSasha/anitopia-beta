import { ChangeEvent, FC, useEffect, useRef } from 'react'
import styles from './styles.module.scss'
import { observer } from 'mobx-react-lite'
import { useStore } from '@app/hooks/useStore'
import { useParams } from 'react-router-dom'
import { handleFetchError } from '@app/helpers/functions'
import { getUserById } from '@shared/api/users/users'

export const AboutMeField: FC = observer(() => {
   const { id } = useParams()
   const { store } = useStore()
   const aboutRef = useRef<HTMLSpanElement>(null)

   useEffect(() => {
      const fetchUserById = async () => {
         try {
            const { data } = await getUserById({ id })
            if (aboutRef.current) {
               aboutRef.current.innerText = data.about || 'Розкажіть про себе'
            }
         } catch (e) {
            handleFetchError(e)
         }
      }

      fetchUserById()
   }, [])

   const handleChange = (e: ChangeEvent<HTMLSpanElement>) => {
      store.userPersonalData.setAbout(e.currentTarget.innerText)
   }

   return <span ref={aboutRef} contentEditable='true' className={styles.input} onInput={handleChange} />
})
