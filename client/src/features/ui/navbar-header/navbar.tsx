import { FC, useContext } from 'react'
import { Logo } from '../../../shared'
import { NavList, ProfileLogout, RegistrationButtons } from '../../../entities'
import styles from './styles.module.scss'
import { useStore } from '@app/hooks/useStore'
import { observer } from 'mobx-react-lite'

export const Navbar: FC = observer(() => {
   const { store } = useStore()

   return (
      <div className={styles.navbar}>
         <Logo />
         <NavList />
         {store.isAuth ? <ProfileLogout /> : <RegistrationButtons />}
      </div>
   )
})
