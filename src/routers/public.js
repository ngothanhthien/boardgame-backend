import express from "express"
import { ErrorForbidden } from "../responses/error.response.js"
import MatchLogController from "../controllers/spirit-island/match-log.controller.js"

const router = express.Router()

router.get("/", (req, res) => {
  return res.status(200).json({ message: "Hello world!" })
})
router.get("/test", (req, res) => {})

router.post("/match-log", MatchLogController.store)
router.get("/match-log", MatchLogController.list)
router.get("/must", async (req, res, next) => {
  // await MatchLogController.bulkStore(req, res, next)
  next(new ErrorForbidden())
})


export default router