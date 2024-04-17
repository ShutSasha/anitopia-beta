import { makeAutoObservable, reaction } from 'mobx'
import Store from '../store'

export default class UserPersonalData {
   store: Store
   firstName = ''
   lastName = ''
   country = ''
   sex = 'Чоловіча стать'
   age: string | number = 0

   constructor(store: Store) {
      this.store = store
      makeAutoObservable(this)

      reaction(
         () => ({
            firstName: store.user.firstName,
            lastName: store.user.lastName,
            country: store.user.country,
            sex: store.user.sex,
            age: store.user.age,
         }),
         () => {
            this.firstName = store.user.firstName || ''
            this.lastName = store.user.lastName || ''
            this.country = store.user.country || ''
            this.sex = store.user.sex || 'Чоловіча стать'
            this.age = store.user.age || 0
         },
      )
   }

   setFirstName(firstName: string | null) {
      if (firstName !== null) {
         this.firstName = firstName
      }
   }

   setLastName(lastName: string | null) {
      if (lastName !== null) {
         this.lastName = lastName
      }
   }

   setCountry(country: string | null) {
      if (country !== null) {
         this.country = country
      }
   }

   setSex(sex: string | null) {
      if (sex !== null) {
         this.sex = sex
      }
   }

   setAge(age: number | string | null) {
      if (age !== null) {
         this.age = age
      }
   }
}
