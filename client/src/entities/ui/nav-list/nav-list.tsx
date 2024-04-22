import { FC, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './styles.module.scss'
import { Menu } from './menu'
import { NAV_NAMES } from './consts/nav-names'
import SearchIcon from '../../../assets/search-icon.svg'
import { getRandomAnime } from '@shared/api/anime/anime'
import { handleFetchError } from '@app/helpers/functions'

export const NavList: FC = () => {
   const [menuActive, setMenuActive] = useState(false)
   const navitage = useNavigate()

   const handleRandomAnimeClick = async () => {
      try {
         const randomAnimeResponse = await getRandomAnime()
         navitage(`/anime/${randomAnimeResponse.data._id}`)
      } catch (e) {
         handleFetchError(e)
      }
   }

   return (
      <>
         <div className={styles.burger_btn} onClick={() => setMenuActive(!menuActive)}>
            <span />
         </div>
         <div className={styles.search_nav_list_wrapper}>
            <img className={styles.search} src={SearchIcon} alt='search' />
            <ul className={styles.nav_list}>
               {NAV_NAMES.map((item, index) => {
                  if (item.word_key === 'random') {
                     return (
                        <div key={index} className={styles.nav_list_item} onClick={handleRandomAnimeClick}>
                           <li>{item.value}</li>
                        </div>
                     )
                  } else {
                     return (
                        <Link key={index} className={styles.nav_list_item} to={item.href}>
                           <li>{item.value}</li>
                        </Link>
                     )
                  }
               })}
            </ul>
         </div>
         <Menu active={menuActive} setActive={setMenuActive} header={'Anitopia'} items={NAV_NAMES} />
      </>
   )
}
