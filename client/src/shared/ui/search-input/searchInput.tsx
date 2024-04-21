import { CSSProperties, ChangeEvent, Dispatch, FC, SetStateAction } from 'react'
import styles from './styles.module.scss'

interface ISearchInputProps {
   searchTerm: string
   handleChangeSearch: (event: ChangeEvent<HTMLInputElement>) => void
   style?: CSSProperties
}

export const SearchInput: FC<ISearchInputProps> = ({ searchTerm, handleChangeSearch, style }) => {
   return (
      <div style={{ ...style }}>
         <input
            type='text'
            className={styles.input}
            placeholder={searchTerm ? searchTerm : 'Пошук за назвою...'}
            value={searchTerm}
            onChange={handleChangeSearch}
         />
      </div>
   )
}
