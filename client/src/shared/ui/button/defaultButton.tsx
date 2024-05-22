import { FC, CSSProperties } from 'react'
import styles from './styles.module.scss'
interface ButtonProps {
   text: string
   padding?: string
   color?: string
   backgroundColor?: string
   disabled?: boolean
   onClick: () => any
}

export const DefaultButton: FC<ButtonProps> = ({
   text,
   padding,
   color,
   backgroundColor,
   disabled = false,
   onClick,
}) => {
   const buttonStyles: CSSProperties = {
      padding: padding || '10px',
      background: disabled ? 'gray' : backgroundColor || '#ff6666',
      color: color || 'white',
   }

   return (
      <>
         <button className={styles.default_btn} style={buttonStyles} onClick={onClick} disabled={disabled}>
            {text}
         </button>
      </>
   )
}
