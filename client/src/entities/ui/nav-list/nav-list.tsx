import { FC, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'
import { Menu } from './menu'
import { items } from './consts/nav-names'
import { handleClickRandomAnime } from '../../../pages/random-anime/api/fetchDataAnime'
import { useStore } from '@app/hooks/useStore'
import SearchIcon from '../../../assets/search-icon.svg'

export const NavList: FC = () => {
   const [menuActive, setMenuActive] = useState(false)
   const { store } = useStore()

   const handleRandomAnimeClick = () => {
      handleClickRandomAnime(store.anime.setAnime, store.anime.setRatingsAnime, store.setLoading, null)
   }

   return (
      <>
         <div className={styles.burger_btn} onClick={() => setMenuActive(!menuActive)}>
            <span />
         </div>
         <div className={styles.search_nav_list_wrapper}>
            <img className={styles.search} src={SearchIcon} alt='search' />
            <ul className={styles.nav_list}>
               {items.map((item, index) => (
                  <Link
                     key={index}
                     className={styles.nav_list_item}
                     to={item.href}
                     onClick={item.click ? () => handleRandomAnimeClick() : undefined}
                  >
                     <li>{item.value}</li>
                  </Link>
               ))}
            </ul>
         </div>
         <Menu active={menuActive} setActive={setMenuActive} header={'Anitopia'} items={items} />
      </>
   )
}
