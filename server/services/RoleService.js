const UserModel = require('../models/User')
const RoleModel = require('../models/Role')
const { model } = require('mongoose')

class RoleService{

   async getUserRoles(userId){
      const user = await UserModel.findById(userId)
      if(!user){
         throw new Error("Користувач не знайден")
      }

      return  user.roles;
   }
   async add(userId, role) {
      const user = await UserModel.findById(userId);
      if (!user) {
         throw new Error('Користувач не знайден');
      }
      const userRole = await RoleModel.findOne({ value: role.toString() });
      if (!userRole) {
         throw new Error('Роль не знайдена');
      }

      if (!user.roles.includes(userRole.value)) {
         user.roles.push(userRole.value);
      }else{
         throw new Error('Користувач вже має вказану роль')
      }
      user.markModified('roles');
      await user.save();
      return user;
   }

   async deleteUserRole(userId,role){
      const user = await UserModel.findById(userId)
      const userRoles = await this.getUserRoles(userId)

      if(!userRoles.includes(role)){
         throw new Error("Користувач не має вказаної ролі")
      }

      user.roles = userRoles.filter(userRole=> userRole !== role)

      user.markModified('roles')
      await user.save();
      return user
   }

}

module.exports = new RoleService()