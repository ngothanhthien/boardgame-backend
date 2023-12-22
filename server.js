import app from "./src/app.js"

const port = process.env.PORT || 3055

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

process.on("SIGINT", () => {
  server.close(() => {
    console.log("Server stopped")
  })
})