import { FC, useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Header } from '@widgets/header'
import { ProfileBgImg } from '@features'
import { useParams } from 'react-router-dom'
import { Loader } from '../../../shared'
import { uploadImage } from '../api/uploadImage'
import { checkUploadStatus } from '../helpers/checkUploadStatus'
import { MainUserInfo } from '@widgets/main-user-info'
import { AnimeCollection } from '@widgets/anime-collection'
import { getUserById } from '@shared/api/users/users.ts'
import { UserByIdResponse } from '@shared/api/models.ts'
import { ContentContainer, Footer, Wrapper } from '@widgets/index'
import { useStore } from '@app/hooks/useStore'
import { handleFetchError } from '@app/helpers/functions'

export const Profile: FC = observer(() => {
   const fileInputRef = useRef<HTMLInputElement | null>(null)
   const { store } = useStore()

   const [user, setUser] = useState<UserByIdResponse>()
   const [img, setImage] = useState<File | null>(null)

   const { id } = useParams()

   useEffect(() => {
      const fetchData = async () => {
         try {
            const res = await getUserById({ id })
            setUser(res.data)
         } catch (e) {
            handleFetchError(e)
         }
      }
      fetchData()
   }, [id])

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
            intervalId = uploadImage(store.user.id, img, () => checkUploadStatus(store.user.username, intervalId))
         } catch (error) {
            clearInterval(intervalId)
            store.isLoading = false
         }
      }

      return () => clearInterval(intervalId)
   }, [img])

   const handleClick = () => {
      fileInputRef.current?.click()
   }

   if (store.isLoading || user === undefined) {
      return <Loader />
   }

   return (
      <Wrapper>
         <Header />
         <ContentContainer>
            <ProfileBgImg />
            <MainUserInfo
               user={user}
               handleClick={handleClick}
               fileInputRef={fileInputRef}
               handleImageChange={handleImageChange}
            />
            <AnimeCollection />
         </ContentContainer>
         <Footer />
      </Wrapper>
   )
})
