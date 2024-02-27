import { FC, useContext, useEffect, useRef, useState } from 'react'
import { Context } from '../../../main'
import { observer } from 'mobx-react-lite'
import { Header } from '../../../widgets/header'
import styles from './styles.module.scss'
import { ProfileBgImg } from '../../../features'
import { useNavigate } from 'react-router-dom'
import { NotFoundPage } from '../../not-found'
import { DefaultButton, InputAuth, Loader, Select } from '../../../shared'
import { uploadImage } from '../api/uploadImage'
import { checkUploadStatus } from '../helpers/checkUploadStatus'
import { MainUserInfo } from '../../../widgets/main-user-info'
import { Modal } from '../../../widgets/Modal'
import axios from 'axios'
import { fetchCountries } from '../api/fetch-countries.ts'
import { AnimeCollection } from '../../../widgets/anime-collection/index.ts'
import $api from '../../../app/http/index.ts'

export const Profile: FC = observer(() => {
   const fileInputRef = useRef<HTMLInputElement | null>(null)
   const { store } = useContext(Context)
   const navigate = useNavigate()
   const [img, setImage] = useState<File | null>(null)
   const [modalActive, setModalActive] = useState<boolean>(false)
   const [lastName, setLastName] = useState<string | null>(store.user.lastName)
   const [firstName, setFirstName] = useState<string | null>('')
   const [age, setAge] = useState<number | null>(null)
   const [sex, setSex] = useState<string | null>('')
   const [country, setCountry] = useState<string | null>('')
   const [countryData, setCountryData] = useState<string[]>([])

   useEffect(() => {
      const fetchCountryData = async () => {
         try {
            const countries = await fetchCountries()
            setCountryData(countries)
         } catch (error) {
            console.error('Ошибка при получении данных о странах:', error)
         }
      }

      fetchCountryData()
   }, [])

   useEffect(() => {
      setLastName(store.user.lastName)
      setFirstName(store.user.firstName)
      setAge(store.user.age)
      setSex(store.user.sex)
      setCountry(store.user.country)
   }, [store.user])

   const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
         const selectedImage = event.target.files[0]
         setImage(selectedImage)
      }
   }

   useEffect(() => {
      let intervalId: any

      if (img) {
         store.isLoading = true

         try {
            intervalId = uploadImage(img, store.user.username, () =>
               checkUploadStatus(
                  store.user.username,
                  intervalId,
                  store.isLoading,
               ),
            )
         } catch (error) {
            clearInterval(intervalId)
            store.isLoading = false
         }
      }

      return () => clearInterval(intervalId)
   }, [img])

   const handleEditProfile = async () => {
      setModalActive(false)
      const profileData = {
         firstName: firstName,
         lastName: lastName,
         age: age,
         sex: sex,
         country: country,
      }

      try {
         const response = await $api.put(
            `/profile/editProfile/${store.user.id}`,
            profileData,
         )
         if (response.status == 200) {
            store.updateUserPersonalInfo(response.data)
         }
      } catch (e) {
         console.error(e)
      }
   }
   const handleClick = () => {
      fileInputRef.current?.click()
   }

   if (store.isLoading) {
      return <Loader />
   }

   if (!store.isAuth) {
      navigate('/login')
      return <NotFoundPage />
   }

   if (store.isAuth) {
      return (
         <div>
            <Header />
            <div className={styles.container}>
               <ProfileBgImg />
               <div className={styles.profile_wrapper}>
                  <MainUserInfo
                     handleClick={handleClick}
                     fileInputRef={fileInputRef}
                     handleImageChange={handleImageChange}
                  />
                  <button
                     onClick={() => setModalActive(true)}
                     className={styles.edit_btn}
                  ></button>
               </div>
               <AnimeCollection />
            </div>

            <Modal
               active={modalActive}
               setActive={setModalActive}
               headerText={'Редактирование профиля'}
            >
               <>
                  <div className={styles.modal_wrapper}>
                     <div className={styles.modal_container}>
                        <div className={styles.modal_container_input}>
                           <InputAuth
                              labelColor={'black'}
                              img={null}
                              setValue={setFirstName}
                              htmlFor={'firstName'}
                              type={'text'}
                              textLabel={'Имя'}
                              value={firstName}
                           />
                           <InputAuth
                              labelColor={'black'}
                              img={null}
                              setValue={setLastName}
                              htmlFor={'lastName'}
                              type={'text'}
                              textLabel={'Фамилия'}
                              value={lastName}
                           />
                        </div>
                        <div className={styles.modal_container_input}>
                           <InputAuth
                              labelColor={'black'}
                              img={null}
                              setValue={setAge}
                              htmlFor={'age'}
                              type={'number'}
                              value={age}
                              textLabel={'Возраст'}
                           />
                           <Select
                              options={['М', 'Ж']}
                              defaultValue={sex}
                              onSelect={(selectedOption) =>
                                 setSex(selectedOption)
                              }
                           />
                        </div>
                     </div>
                     <div className={styles.select_container}>
                        <Select
                           options={countryData}
                           defaultValue={country}
                           onSelect={(selectedOption) =>
                              setCountry(selectedOption)
                           }
                        />
                     </div>
                     <div className={styles.btn_container}>
                        <DefaultButton
                           text={'Редактировать'}
                           padding={'10px'}
                           color={'white'}
                           backgroundColor={'#ff6666'}
                           onClick={handleEditProfile}
                        />
                     </div>
                  </div>
               </>
            </Modal>
         </div>
      )
   }
})
