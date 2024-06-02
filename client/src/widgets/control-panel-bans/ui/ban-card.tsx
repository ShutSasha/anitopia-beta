import { UserByIdResponse } from '@shared/api'
import { FC, useEffect, useState } from 'react'
import styles from './ban_card.module.scss'
import { handleFetchError, showNotice } from '@app/helpers/functions'
import $api from '@app/http'
import { Modal } from '@widgets/Modal'
import BanDatePicker from './ban-data-picker'
import { Dayjs } from 'dayjs'
import { getMostFrequentCategory } from '../helpers/get-most-frequent-category'
import { handleBan } from '../helpers/handle-ban'

interface BanCardProps {
   user: UserByIdResponse
}

export const BanCard: FC<BanCardProps> = ({ user }) => {
   const [banToggle, setToggle] = useState<boolean>(false)
   const [complaintsCount, setComplaintsCount] = useState<number | undefined>(0)
   const [category, setCategory] = useState<string>('Немає')
   const [banCount, setBanCount] = useState<number | undefined>(user.bans.length || 0)
   const [temporaryModal, setTemporaryModal] = useState<boolean>(false)
   const [permanentModal, setPermanentModal] = useState<boolean>(false)

   const [startDate, setStartDate] = useState<Dayjs | null>(null)
   const [startTime, setStartTime] = useState<Dayjs | null>(null)
   const [endDate, setEndDate] = useState<Dayjs | null>(null)
   const [endTime, setEndTime] = useState<Dayjs | null>(null)

   useEffect(() => {
      const fetchUserComplaints = async () => {
         try {
            const { data } = await $api.get(`/complaints/${user._id}`)
            setComplaintsCount(data.length)
            setCategory(getMostFrequentCategory(data))
         } catch (e) {
            handleFetchError(e)
         }
      }
      fetchUserComplaints()
   }, [user._id])

   useEffect(() => {
      const fetchUserBans = async () => {
         try {
            const { data } = await $api.get(`/bans/${user._id}`)

            setBanCount(data.length)
         } catch (e) {
            handleFetchError(e)
         }
      }
      fetchUserBans()
   }, [banToggle])

   const handleTemporaryBan = async () => {
      await handleBan({
         userId: user._id,
         isPermanent: false,
         startDate,
         startTime,
         endDate,
         endTime,
         setTemporaryModal,
         setPermanentModal,
      })
      setToggle(!banToggle)
   }

   const handlePermanentBan = async () => {
      await handleBan({
         userId: user._id,
         isPermanent: true,
         startDate: null,
         startTime: null,
         endDate: null,
         endTime: null,
         setTemporaryModal,
         setPermanentModal,
      })
      setToggle(!banToggle)
   }

   const handleRemoveBan = async () => {
      try {
         await $api.delete(`/bans/${user._id}`)
         showNotice('Блокування знято')
      } catch (e) {
         handleFetchError(e)
      }
      setToggle(!banToggle)
   }

   return (
      <div className={styles.card_container}>
         <div className={styles.user_container}>
            <img className={styles.user_img} src={user.avatarLink} alt='' />
            <p className={styles.user_username}>{user.username}</p>
         </div>
         <div className={styles.complaint_count}>{complaintsCount}</div>
         <div className={styles.category_of_complaint}>{category}</div>
         <div className={styles.past_bans_count}>{banCount}</div>
         <div className={styles.actions}>
            <div onClick={handleRemoveBan} className={styles.temporary_ban}>
               <img
                  className={styles.temporary_ban_img}
                  src='https://img.icons8.com/?size=100&id=46&format=png&color=000000'
                  alt=''
               />
               <p>зняти блокування</p>
            </div>
            <div onClick={() => setTemporaryModal(true)} className={styles.temporary_ban}>
               <img className={styles.temporary_ban_img} src='/admin-panel/temp-ban.svg' alt='' />
               <p>тимчасове блокування</p>
            </div>
            <Modal
               modalWidth='30vw'
               headerTextSize='18px'
               active={temporaryModal}
               setActive={setTemporaryModal}
               headerText='Тимчасове блокування'
            >
               <div className={styles.temporary_modal_container}>
                  <BanDatePicker
                     onStartDateChange={setStartDate}
                     onStartTimeChange={setStartTime}
                     onEndDateChange={setEndDate}
                     onEndTimeChange={setEndTime}
                  />
                  <div className={styles.temporary_buttons}>
                     <button className={styles.ban_btn} onClick={handleTemporaryBan}>
                        Забанити
                     </button>
                     <button className={styles.cancel_btn} onClick={() => setTemporaryModal(false)}>
                        Скасувати
                     </button>
                  </div>
               </div>
            </Modal>
            <div onClick={() => setPermanentModal(true)} className={styles.permanent_ban}>
               <img className={styles.permanent_ban_img} src='/admin-panel/permanent-ban.svg' alt='' />
               <p>заблокувати назавжди</p>
            </div>
            <Modal
               modalWidth='30vw'
               headerTextSize='18px'
               active={permanentModal}
               setActive={setPermanentModal}
               headerText='Тимчасове блокування'
            >
               <div className={styles.permanent_modal_container}>
                  <div className={styles.temporary_buttons}>
                     <button className={styles.ban_btn} onClick={handlePermanentBan}>
                        Забанити
                     </button>
                     <button className={styles.cancel_btn} onClick={() => setPermanentModal(false)}>
                        Скасувати
                     </button>
                  </div>
               </div>
            </Modal>
         </div>
      </div>
   )
}
