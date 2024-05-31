import { FC } from 'react'
import styles from './styles.module.scss'
import { format } from 'date-fns'
import { observer } from 'mobx-react-lite'
import { UserByIdResponse } from '@shared/api'

type Props = {
   user: UserByIdResponse
}

export const UserPersonalInfo: FC<Props> = observer(({ user }) => {
   const renderUserDataItem = (dataUser: React.ReactNode | string, label: string) => (
      <li className={styles.user_data_item}>
         {label}
         {dataUser ? <span>{dataUser}</span> : <span>Не вказано</span>}
      </li>
   )

   return (
      <>
         <div className={styles.container_user_data}>
            <ul className={styles.user_data_list}>
               {renderUserDataItem(format(user.registrationDate, 'dd-MM-yyyy') || 'Не вказано', 'Дата реєстрації: ')}
               {renderUserDataItem(user.firstName, `Ім'я: `)}
               {renderUserDataItem(user.lastName, 'Прізвище: ')}
            </ul>
            <ul className={styles.user_data_list}>
               {renderUserDataItem(user.country, 'Країна: ')}
               {renderUserDataItem(user.sex, 'Стать: ')}
               {renderUserDataItem(user.age, 'Вік: ')}
            </ul>
         </div>
         <ul className={styles.user_data_list}>{renderUserDataItem(user.about, 'Про себе: ')}</ul>
      </>
   )
})
