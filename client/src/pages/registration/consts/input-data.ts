// inputsData.ts
import userImg from '../assets/person.svg'
import emailImg from '../assets/mail.svg'
import passwordImg from '../assets/lock-closed.svg'

export const getInputsData = (setUsername: any, setEmail: any, setPassword: any, setRepeatPassword: any) => [
   {
      img: userImg,
      setValue: setUsername,
      htmlFor: 'username',
      type: 'text',
      textLabel: `Ім'я користувача`,
   },
   {
      img: emailImg,
      setValue: setEmail,
      htmlFor: 'email',
      type: 'email',
      textLabel: 'Почта',
   },
   {
      img: passwordImg,
      setValue: setPassword,
      htmlFor: 'password',
      type: 'password',
      textLabel: 'Пароль',
   },
   {
      img: passwordImg,
      setValue: setRepeatPassword,
      htmlFor: 'repeat-password',
      type: 'password',
      textLabel: 'Подтверждение пароля',
   },
]
