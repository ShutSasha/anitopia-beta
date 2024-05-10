import { FC, useContext } from 'react'
import { AvatarUsernameProfile, UserPersonalInfo } from '../../../features'
import { UserByIdResponse } from '@shared/api'
import styles from './styles.module.scss'
import { Link } from 'react-router-dom'
import { useStore } from '@app/hooks/useStore'
export interface MainUserInfoProps {
   handleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
   fileInputRef: React.RefObject<HTMLInputElement>
   handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void
   user: UserByIdResponse
}

export const MainUserInfo: FC<MainUserInfoProps> = ({ user, handleClick, fileInputRef, handleImageChange }) => {
   const { store } = useStore()
   return (
      <div className={styles.profile_wrapper}>
         <AvatarUsernameProfile
            user={user}
            handleClick={handleClick}
            fileInputRef={fileInputRef}
            handleImageChange={handleImageChange}
         />
         <UserPersonalInfo user={user} />
         {store.user.id === user._id && <Link to={`/user-settings/${user._id}/account`} className={styles.edit_btn} />}
      </div>
   )
}
