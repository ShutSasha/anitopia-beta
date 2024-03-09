import { FC, ReactNode } from 'react'
import styles from './styles.module.scss'

interface ModalProps {
   active: boolean
   setActive: (value: boolean) => void
   children: ReactNode
   headerText: string
   modalWidth?: string
   containerPadding?: string
}

export const Modal: FC<ModalProps> = ({
   active,
   setActive,
   children,
   headerText,
   modalWidth = '50vw',
   containerPadding = '15px 10px',
}) => {
   const modalActive = active ? `${styles.modal} ${styles.modal_active}` : `${styles.modal}`
   const contentModalActive = active
      ? `${styles.modal_content} ${styles.modal_content_active}`
      : `${styles.modal_content}`

   return (
      <div className={modalActive} onClick={() => setActive(false)}>
         <div style={{ width: modalWidth }} className={contentModalActive} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modal_header}>
               <p className={styles.header_text}>{headerText}</p>
            </div>
            <div style={{ padding: containerPadding }}>{children}</div>
         </div>
      </div>
   )
}
