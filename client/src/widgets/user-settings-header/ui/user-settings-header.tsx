import { FC } from 'react'
import styles from './styles.module.scss'
import { SETTINGS_TABS } from '../const/settings_tabs'
import { Link } from 'react-router-dom'

interface UserSettingsHeaderProps {
   pathURL: string | undefined
}

export const UserSettingsHeader: FC<UserSettingsHeaderProps> = ({ pathURL }) => {
   return (
      <div className={styles.header_settigns_container}>
         <div className={styles.settings_header}>
            <h2 className={styles.settings_title}>Налаштування</h2>
         </div>
         <div className={styles.settings_tab}>
            <ul className={styles.settings_tab_list}>
               {SETTINGS_TABS.map((item) => (
                  <Link key={item.tab} to={location.pathname.replace(`${pathURL}`, `${item.path}`)}>
                     <li
                        style={item.path === pathURL ? { backgroundColor: '#ff6666' } : undefined}
                        className={styles.settings_tab_item}
                     >
                        {item.tab}
                     </li>
                  </Link>
               ))}
            </ul>
         </div>
      </div>
   )
}
