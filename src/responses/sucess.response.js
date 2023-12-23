"use strict"

class SuccessResponse {
  constructor({ message, data, status = 200 }) {
    this.message = message
    this.data = data
    this.status = status
  }

  send = (res) => {
    return res.status(this.status).json(this)
  }
}

export default SuccessResponse