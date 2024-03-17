module.exports = class UserDto {
   username
   id
   isActivated
   roles
   avatarLink
   registrationDate
   firstName
   lastName
   country
   sex
   age

   constructor(model) {
      this.username = model.username
      this.id = model._id
      this.isActivated = model.isActivated
      this.roles = model.roles
      this.avatarLink = model.avatarLink
      this.registrationDate = model.registrationDate
      this.firstName = model.firstName
      this.lastName = model.lastName
      this.country = model.country
      this.sex = model.sex
      this.age = model.age
   }
}
