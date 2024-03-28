import { FC } from 'react'
import styles from './styles.module.scss'
import { Navbar } from '../../../features'
import { observer } from 'mobx-react-lite'

export const Header: FC = observer(() => {
   return (
      <>
         <div className={styles.header}>
            <div className={styles.container_header}>
               <Navbar />
            </div>
         </div>
      </>
   )
})
