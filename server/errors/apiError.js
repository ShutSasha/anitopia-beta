module.exports = class ApiError extends Error {
   status
   errors

   constructor(status, message, errors = []) {
      super(message)
      this.status = status
      this.errors = errors
   }

   static UnauthorizedError(message = 'Користувач не авторизований') {
      return new ApiError(401, message)
   }

   static BadRequest(message, error = []) {
      return new ApiError(400, message, error)
   }

   static Forbidden(message = 'Недостатньо прав доступу') {
      return new ApiError(403, message)
   }
}
