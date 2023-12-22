import express from "express"
import morgan from "morgan"
import helmet from "helmet"
import compression from "compression"
import 'dotenv/config'

const app = express()

// init middleware
// app.use(morgan("combined"))
app.use(morgan("dev")) //log
app.use(helmet()) //security
app.use(compression()) //compress

// init db
import "./dbs/init.mongodb.js"

// init routes
app.get("/", (req, res) => {
  return res.status(200).json({ message: "Hello world!" })
})

export default app