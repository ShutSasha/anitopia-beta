import { FC } from 'react'
import styles from './styles.module.scss'
import { SETTINGS_TABS } from '../const/settings_tabs'

export const UserSettingsHeader: FC = () => {
   return (
      <div className={styles.header_settigns_container}>
         <div className={styles.settings_header}>
            <h2 className={styles.settings_title}>Налаштування</h2>
         </div>
         <div className={styles.settings_tab}>
            <ul className={styles.settings_tab_list}>
               {SETTINGS_TABS.map((item) => (
                  <li key={item.tab} className={styles.settings_tab_item}>
                     {item.tab}
                  </li>
               ))}
            </ul>
         </div>
      </div>
   )
}
