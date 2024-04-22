import { FC } from 'react'
import { Logo } from '../../../shared'
import { NavList, ProfileLogout, RegistrationButtons } from '../../../entities'
import styles from './styles.module.scss'
import { useStore } from '@app/hooks/useStore'
import { observer } from 'mobx-react-lite'

export const Navbar: FC<{ searchClickHandler: () => void }> = observer(({ searchClickHandler }) => {
   const { store } = useStore()

   return (
      <div className={styles.navbar}>
         <Logo />
         <NavList searchClickHandler={searchClickHandler} />
         {store.isAuth ? <ProfileLogout /> : <RegistrationButtons />}
      </div>
   )
})
