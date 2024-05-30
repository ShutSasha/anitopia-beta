import { CSSProperties, FC } from 'react'
import styles from './styles.module.scss'
import { AnimeCatalogFilter, AnimeCatalogSort } from '@features'

interface ToolBarProps {
   style?: CSSProperties
}

export const ToolBar: FC<ToolBarProps> = ({ style }) => {
   return (
      <div style={{ ...style }} className={styles.tool_bar_container}>
         <AnimeCatalogSort />
         <AnimeCatalogFilter />
      </div>
   )
}
