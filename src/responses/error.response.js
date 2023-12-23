"use strict"

class ErrorResponse extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
    this.success = false
  }
}

class ErrorFailedValidation extends ErrorResponse {
  constructor(errors) {
    super('Unprocessable Content', 422)
    this.errors = errors
  }
}

class ErrorForbidden extends ErrorResponse {
  constructor() {
    super("Forbidden", 403)
  }
}

class ErrorBadRequest extends ErrorResponse {
  constructor(message) {
    super(message, 400)
  }
}

export {
  ErrorFailedValidation,
  ErrorForbidden,
  ErrorBadRequest
}