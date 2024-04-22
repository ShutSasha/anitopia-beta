import React, { FC, ReactNode } from 'react'
import styles from './styles.module.scss'
interface ModalProps {
   active: boolean
   setActive: (value: boolean) => void
   children: ReactNode
}

export const SearchModal: FC<ModalProps> = ({ active, setActive, children }) => {
   const modalActive = active ? `${styles.search_modal} ${styles.search_modal_active}` : `${styles.search_modal}`
   const contentModalActive = active
      ? `${styles.search_modal_content} ${styles.search_modal_content_active}`
      : `${styles.search_modal_content}`

   return (
      <div className={modalActive} onClick={() => setActive(false)}>
         <div className={contentModalActive} onClick={(e) => e.stopPropagation()}>
            {children}
         </div>
      </div>
   )
}
