import express from "express"
import morgan from "morgan"
import helmet from "helmet"
import compression from "compression"
import publicRouter from "./routers/public.js"
import 'dotenv/config'

const app = express()

// init middleware
// app.use(morgan("combined"))
app.use(morgan("dev")) //log
app.use(helmet()) //security
app.use(compression()) //compress
app.use(express.json()); // parse json

// init db
import "./dbs/init.mongodb.js"

// init routes
app.use("/api/v1", publicRouter)


// error handler
app.use((req, res, next) => {
  const error = new Error("Not found")
  error.status = 404
  next(error)
})
app.use((error, req, res, next) => {
  const status = error.status || 500
  const message = error.message || "Internal server error"
  return res.status(status).json({
    success: false,
    message,
    status
  })
})

export default app