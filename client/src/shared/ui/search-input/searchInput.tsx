import { CSSProperties, FC, FormEvent, useState } from 'react'
import styles from './styles.module.scss'

interface ISearchInputProps {
   onClickEvent: (value: string) => void
   style?: CSSProperties
}

export const SearchInput: FC<ISearchInputProps> = ({ onClickEvent, style }) => {
   const [searchParam, setSearchParam] = useState<string>('')

   const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      onClickEvent(searchParam)
   }

   return (
      <form style={{ ...style }} className={styles.form} onSubmit={handleSubmit}>
         <input
            type='text'
            className={styles.input}
            placeholder={searchParam ? searchParam : 'Пошук за назвою...'}
            onChange={(e) => setSearchParam(e.target.value)}
         />
      </form>
   )
}
