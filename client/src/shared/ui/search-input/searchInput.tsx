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
         <form onSubmit={handleSubmit}>
            <input
               type='text'
               className={styles.input}
               placeholder={searchParam ? searchParam : 'НАЙТИ АНИМЕ'}
               onChange={(e) => setSearchParam(e.target.value)}
            />
         </form>
      </>
   )
}
