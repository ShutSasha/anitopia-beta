import React, { FC, useContext, useState } from 'react'
import styles from './styles.module.scss'
import TextField from '@mui/material/TextField'
import { CountrySelectMUI } from '@shared/ui/country-select-mui'
import { AboutMeField } from '@entities/index'
import { Context } from '../../../../main'
import { observer } from 'mobx-react-lite'
import { SexSelect } from '@shared/index'

export const UserPersonalInfoForm: FC = React.memo(
   observer(() => {
      const { store } = useContext(Context)
      const [sex, setSex] = useState<string>(store.userPersonalData.sex)

      const handleSex = (sex: string) => {
         setSex(sex)
         store.userPersonalData.setSex(sex)
      }

      return (
         <div className={styles.user_personal_container}>
            <div className={styles.user_personal_inputs}>
               <TextField
                  value={store.userPersonalData.firstName}
                  onChange={(event) => store.userPersonalData.setFirstName(event.target.value)}
                  label={`Ім'я`}
                  variant='standard'
               />
               <TextField
                  value={store.userPersonalData.lastName}
                  onChange={(event) => store.userPersonalData.setLastName(event.target.value)}
                  label={`Прізвище`}
                  variant='standard'
               />
               <TextField
                  value={store.userPersonalData.age}
                  onChange={(event) => store.userPersonalData.setAge(event.target.value)}
                  label={`Вік`}
                  variant='standard'
               />
               <SexSelect value={sex} setValue={(sex) => handleSex(sex)} />
               <CountrySelectMUI />
            </div>
            <AboutMeField />
         </div>
      )
   }),
)
