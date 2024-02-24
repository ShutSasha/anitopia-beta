import { FC, ChangeEvent, useState } from 'react'
import styles from './styles.module.scss'
import { valueOf } from '@typescript-eslint/eslint-plugin'
interface ISelectProps {
   options: string[]
   onSelect: (selectedOption: string) => void
   defaultValue?: any
}

export const Select: FC<ISelectProps> = ({
   options,
   onSelect,
   defaultValue,
}) => {
   const [selectedOption, setSelectedOption] = useState<string>('Не указано')

   const optionDefaultValue = defaultValue ? 'Не указано' : defaultValue
   const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
      setSelectedOption(event.target.value)
      onSelect(event.target.value)
   }
   console.log(optionDefaultValue)

   return (
      <select
         className={styles.select}
         value={selectedOption}
         onChange={handleChange}
      >
         <option value={optionDefaultValue}>{defaultValue}</option>
         {options.map((option, index) => (
            <option key={index} value={option}>
               {option}
            </option>
         ))}
      </select>
   )
}
