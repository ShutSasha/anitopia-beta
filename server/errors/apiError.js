module.exports = class ApiError extends Error {
   status
   errors

   constructor(status, message, errors = []) {
      super(message)
      this.status = status
      this.errors = errors
   }

   static UnauthorizedError(message = 'Пользователь не авторизирован') {
      return new ApiError(401, message)
   }

   static BadRequest(message, error = []) {
      return new ApiError(400, message, error)
   }

   static Forbidden(message = 'Недостаточно прав доступа') {
      return new ApiError(403, message)
   }
}
