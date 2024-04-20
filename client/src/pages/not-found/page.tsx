import { FC, useContext } from 'react'
import styles from './style.module.scss'
import { Loader } from '../../shared'
import { Link } from 'react-router-dom'
import { useStore } from '@app/hooks/useStore'
import { observer } from 'mobx-react-lite'

export const NotFoundPage: FC = observer(() => {
   const { store } = useStore()

   if (store.isLoading) {
      return <Loader />
   }

   return (
      <div className={styles.container}>
         <div className={styles.content}>
            <p className={styles.title_404}>404</p>
            <div className={styles.general_text}>
               <p className={styles.page_not_found_title}>СТОРІНКА НЕ ЗНАЙДЕНА</p>
               <p className={styles.default_text}>Сторінку, до якої ви звернулися, видалено або перенесено.</p>
               <p className={styles.default_text}>
                  Будь ласка, перейдіть на&#32;
                  <Link className={styles.link_to_home_page} to='/'>
                     головну сторінку
                  </Link>
                  сайту.
               </p>
            </div>
         </div>
      </div>
   )
})
