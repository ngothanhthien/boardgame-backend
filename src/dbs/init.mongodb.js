"use strict"

import mongoose from "mongoose"
import uri from "../configs/mongodb.js"

class Database {
  constructor() {
    this.connect()
  }

  connect() {
    if (1) {
      mongoose.set("debug", true)
      mongoose.set("debug", { color: true })
    }

    mongoose.connect(uri).then(() => {
      console.log("Database connection successful")
    }).catch(err => {
      console.error("Database connection error")
    })
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database()
    }

    return Database.instance
  }
}

export default Database.getInstance()