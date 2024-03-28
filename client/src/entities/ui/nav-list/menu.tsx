import styles from './menu.module.scss'
import { Link } from 'react-router-dom'
import { FC, useEffect } from 'react'
interface ToastProps {
   header: string
   items: any
   active: any
   setActive: any
}

export const Menu: FC<ToastProps> = ({ header, items, active, setActive }) => {
   useEffect(() => {
      if (active) {
         document.body.style.overflow = 'hidden'
      } else {
         document.body.style.overflow = ''
      }
   }, [active])

   return (
      <div className={`${styles.menu} ${active ? styles.active : ''}`} onClick={() => setActive(false)}>
         <div className={styles.blur} />
         <div className={styles.menu_content} onClick={(e) => e.stopPropagation()}>
            <div className={styles.menu_header}>
               <Link to='/'>{header}</Link>
            </div>
            <ul className={styles.menu_list}>
               {items.map((item: any, index: number) => (
                  <Link key={index} className={styles.item_link} to={item.href}>
                     <li>{item.value}</li>
                  </Link>
               ))}
            </ul>
         </div>
      </div>
   )
}
