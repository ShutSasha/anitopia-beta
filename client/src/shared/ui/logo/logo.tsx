import { FC } from 'react'
import styles from './styles.module.scss'
import { Link } from 'react-router-dom'

export const Logo: FC = () => {
   return (
      <Link className={styles.logo} to='/'>
         Anitopia
      </Link>
   )
}
