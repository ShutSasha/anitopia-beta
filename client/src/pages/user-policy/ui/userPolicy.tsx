import { FC } from 'react'
import { Header } from '../../../widgets/header'
import styles from '../ui/styles.module.scss'

export const UserPolicy: FC = () => {
   return (
      <>
         <Header />
         <div className={styles.container}>
            <div className={styles.wrapper}>
               <p>Some policy</p>
            </div>
         </div>
      </>
   )
}
