import { CSSProperties, FC } from 'react'
import styles from './styles.module.scss'
import { AnimeCatalogSort } from '@features'

interface ToolBarProps {
   style?: CSSProperties
}

export const ToolBar: FC<ToolBarProps> = ({ style }) => {
   return (
      <div style={{ ...style }} className={styles.tool_bar_container}>
         <AnimeCatalogSort />
         <div className={styles.filter}>filter</div>
      </div>
   )
}
