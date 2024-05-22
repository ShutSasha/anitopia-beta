import { FC, useState } from 'react'
import styles from './collapse.module.scss'

interface Props {
   title: string
   description: string
}

export const Collapse: FC<Props> = ({ title, description }) => {
   const [isOpen, setIsOpen] = useState<boolean>(false)

   const toggleDescription = () => {
      setIsOpen(!isOpen)
   }

   return (
      <div className={styles.expandable_block} onClick={toggleDescription} style={{ backgroundColor: '#343A40' }}>
         <div className={styles.title}>
            {title}
            <span className={`${styles.arrow_wrapper} ${isOpen ? styles.open : ''}`}>
               <span className={styles.arrow}></span>
            </span>
         </div>
         <div className={`${styles.description_wrapper} ${isOpen ? styles.open_desc : ''}`}>
            <div className={styles.line}></div>
            <div className={styles.description}>{description}</div>
         </div>
      </div>
   )
}
