import { FC } from 'react'
import { AvatarUsernameProfile, UserPersonalInfo } from '../../../features'
import { observer } from 'mobx-react-lite'
import { UserByIdResponse } from '@shared/api'
export interface MainUserInfoProps {
   handleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
   fileInputRef: React.RefObject<HTMLInputElement>
   handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void
   user: UserByIdResponse
}

export const MainUserInfo: FC<MainUserInfoProps> = observer(
   ({ user, handleClick, fileInputRef, handleImageChange }) => {
      return (
         <>
            <AvatarUsernameProfile
               user={user}
               handleClick={handleClick}
               fileInputRef={fileInputRef}
               handleImageChange={handleImageChange}
            />
            <UserPersonalInfo user={user} />
         </>
      )
   },
)
