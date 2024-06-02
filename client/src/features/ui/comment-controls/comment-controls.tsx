import { FC, useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'
import { deleteComment } from '@shared/api/comments/comments'
import { observer } from 'mobx-react-lite'
import { useStore } from '@app/hooks/useStore'
import { handleFetchError, showNotice } from '@app/helpers/functions'
import { Modal } from '@widgets/Modal'
import { Select } from 'antd'
import { COMPLAINTS } from './consts/ComplaintTypes.ts'
import { DefaultButton } from '@shared/ui/button/defaultButton.tsx'
import { handleComplaint } from './helpers/handleComplaint.ts'
type Props = {
   commentId: string
   animeId: string
   user_id: string
   setEdit: React.Dispatch<React.SetStateAction<boolean>>
}

export const CommentControls: FC<Props> = observer(({ commentId, animeId, user_id, setEdit }) => {
   const { store } = useStore()
   const [isActive, setActive] = useState<boolean>(false)
   const optionsRef = useRef<HTMLDivElement>(null)
   const [complaintModal, setComplaintModel] = useState<boolean>(false)
   const [type,setType] = useState<string>('')
   const handleDeleteCommentClick = async () => {
      try {
         const res = await deleteComment({ commentId, animeId })

         if (res.status === 200) {
            store.anime.setToggleUpdateComments()
            showNotice('Коментар видалено', '=_=')
         }
      } catch (error) {
         handleFetchError(error)
      }
   }

   const handleAddComplaint = async () => {
      await handleComplaint({
         from_user: store.user.id,
         to_user: user_id,
         category: type,
         setComplaintModal:setComplaintModel
      });
   }

   const handleEditCommentClick = async () => {
      setEdit(true)
   }

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
            setActive(false)
         }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => {
         document.removeEventListener('mousedown', handleClickOutside)
      }
   }, [])

   return (
      <div ref={optionsRef} onClick={() => setActive(!isActive)} className={styles.options_wrapper}>
         <span className={styles.drop_menu_click} />
         <div className={isActive ? `${styles.hidden_menu}` : `${styles.hidden_menu} ${styles.invisible}`}>
            <div className={styles.drop_lits}>
               {store.user.id == user_id ? (
                  <>
                     <div className={styles.drop_menu_item} onClick={handleEditCommentClick}>
                        Редагувати
                     </div>
                     <div className={styles.drop_menu_item} onClick={handleDeleteCommentClick}>
                        Видалити
                     </div>
                  </>
               ) : (
                  <div onClick={() => setComplaintModel(true)} className={styles.drop_menu_item}>Поскаржитись</div>
               )}
            </div>
         </div>
         <Modal modalWidth={"30vw"} active={complaintModal} setActive={setComplaintModel} headerText={'Створити скаргу'}>
            <div className={styles.complaint_modal_content}>
               <Select
                  size={'middle'}
                  placeholder="Будь ласка, виберіть тип скарги"
                  style={{
                     width: '300px',
                     margin: '10px 0',
                  }}
                  options={COMPLAINTS}
                  onChange={(value) => setType(value)}
               >
               </Select>
               <DefaultButton text={"Відправити скаргу"} onClick={handleAddComplaint}/>
            </div>
         </Modal>
      </div>
   )
})
