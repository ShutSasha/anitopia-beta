import { FC, useState } from 'react'
import styles from './styles.module.scss'

interface InputAuthProps {
   img: any | null
   setValue: (item: any) => void
   htmlFor: string
   type: string
   textLabel: string
   labelColor: string
   value?: any
}

export const InputAuth: FC<InputAuthProps> = ({ img, setValue, htmlFor, type, textLabel, labelColor, value = '' }) => {
   const [inputValue, setInputValue] = useState(value)

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value)
      setValue(e.target.value)
   }

   return (
      <>
         <div className={styles.input_box}>
            <span className={styles.icon}>
               <img src={img} alt='' />
            </span>
            <input onChange={handleChange} id={htmlFor} type={type} value={inputValue} required />
            <label htmlFor={htmlFor} style={{ color: labelColor }}>
               {textLabel}
            </label>
         </div>
      </>
   )
}
