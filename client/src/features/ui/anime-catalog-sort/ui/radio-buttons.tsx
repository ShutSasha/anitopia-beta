import * as React from 'react'
import Radio from '@mui/material/Radio'
import FormControlLabel from '@mui/material/FormControlLabel'
import RadioGroup from '@mui/material/RadioGroup'
import { observer } from 'mobx-react-lite'
import { set } from 'date-fns'

interface ColorRadioButtonsProps {
   valueList: { label: string; value: string }[]
   sortValue: string
   setSort: (value: string) => void
}

export const ColorRadioButtons: React.FC<ColorRadioButtonsProps> = observer(({ valueList, sortValue, setSort }) => {
   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSort(event.target.value)
   }

   return (
      <RadioGroup value={sortValue} onChange={handleChange}>
         {valueList.map((item, index) => (
            <FormControlLabel
               key={index}
               value={item.value}
               control={
                  <Radio
                     sx={{
                        color: '#ff6666',
                        '&.Mui-checked': {
                           color: '#ff6666',
                        },
                     }}
                  />
               }
               sx={{
                  whiteSpace: 'nowrap',
               }}
               label={item.label}
            />
         ))}
      </RadioGroup>
   )
})
