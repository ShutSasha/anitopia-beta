import { ContentContainer } from '@widgets/content-container'
import { FC, useState } from 'react'
import styles from './styles.module.scss'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export const UserSettingsPremium: FC = () => {
   const { id } = useParams()
   const [htmlForm, setHtmlForm] = useState<string>('')
   const [showForm, setShowForm] = useState<boolean>(false)
   const handleBuyPremium = async () => {
      try {
         const response = await axios.post(`http://localhost:5000/api/users/${id}/subscribe`)
         setHtmlForm(response.data)
         setShowForm(true)
      } catch (e) {
         console.error(e)
      }
   }
   console.log(htmlForm)

   return (
      <ContentContainer
         style={{
            padding: '30px',
            backgroundColor: '#fff',
            borderBottomLeftRadius: '10px',
            borderBottomRightRadius: '10px',
            marginBottom: '30px',
         }}
      >
         <h2 className={styles.anitopia_better_with_premium_title}>Anitopia ще красивіша з підпискою!</h2>
         <h3 className={styles.what_we_offer_title}>Що ми пропонуємо</h3>
         <ul className={styles.offers_lsit}>
            <li className={styles.offer_item}>
               <div className={`${styles.offer_card} ${styles.notification}`}></div>
               <p className={styles.card_text}>Система нотифікацій</p>
            </li>
            <li className={styles.offer_item}>
               <div className={`${styles.offer_card} ${styles.customize_profile}`}></div>
               <p className={styles.card_text}>Поліпшена кастомізація профілю</p>
            </li>
            <li className={styles.offer_item}>
               <div className={`${styles.offer_card} ${styles.web_settings}`}></div>
               <p className={styles.card_text}>Налаштування сайту на власне бажання</p>
            </li>
         </ul>

         <button className={styles.buy_premium} onClick={handleBuyPremium}>
            Придбати
         </button>
      </ContentContainer>
   )
}
