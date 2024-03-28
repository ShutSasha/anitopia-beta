import { FC, FormEvent, useState } from 'react'
import styles from './styles.module.scss'

interface ISearchInputProps {
   onClickEvent: (value: string) => void
}

export const SearchInput: FC<ISearchInputProps> = ({ onClickEvent }) => {
   const [searchParam, setSearchParam] = useState<string>('')

   const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      onClickEvent(searchParam)
   }

   return (
      <>
         <form className={styles.form} onSubmit={handleSubmit}>
            <input
               type='text'
               className={styles.input}
               placeholder={searchParam ? searchParam : 'ЗНАЙТИ АНІМЕ'}
               onChange={(e) => setSearchParam(e.target.value)}
            />
         </form>
      </>
   )
}
