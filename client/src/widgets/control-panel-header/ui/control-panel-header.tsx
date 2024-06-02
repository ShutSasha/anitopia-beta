import { FC } from 'react'
import styles from './styles.module.scss'
import { useStore } from '@app/hooks/useStore'
import { observer } from 'mobx-react-lite'
import { Link, useLocation } from 'react-router-dom'
import { CONTROL_PANEL_TABS } from '../consts/control-panel-tabs'

interface ControlPanelHeaderProps {
   style?: React.CSSProperties
}

export const ControlPanelHeader: FC<ControlPanelHeaderProps> = observer(({ style }) => {
   const { store } = useStore()
   const location = useLocation()
   const pathURL = location.pathname.split('/').pop()

   return (
      <div style={{ ...style }}>
         <div className={styles.top_part_header}>
            <h2 className={styles.top_part_header_title}>
               Панель {store.user.roles && store.user.roles.includes('ADMIN') ? 'адміністратора' : 'модератора'}
            </h2>
         </div>
         <div className={styles.bottom_part_header}>
            {CONTROL_PANEL_TABS.map((item) => (
               <Link
                  style={item.path === pathURL ? { backgroundColor: '#ff6666' } : undefined}
                  key={item.tab}
                  to={location.pathname.replace(`${pathURL}`, `${item.path}`)}
                  className={styles.bottom_part_header_item}
               >
                  {item.tab}
               </Link>
            ))}
         </div>
      </div>
   )
})
