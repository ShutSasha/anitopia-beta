import * as React from 'react'
import { pink } from '@mui/material/colors'
import Radio from '@mui/material/Radio'
import FormControlLabel from '@mui/material/FormControlLabel'
import RadioGroup from '@mui/material/RadioGroup'

interface ColorRadioButtonsProps {
   valueList: { label: string; value: string }[]
}

export const ColorRadioButtons: React.FC<ColorRadioButtonsProps> = ({ valueList }) => {
   const [selectedValue, setSelectedValue] = React.useState('')

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedValue(event.target.value)
   }

   return (
      <RadioGroup value={selectedValue} onChange={handleChange}>
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
}
