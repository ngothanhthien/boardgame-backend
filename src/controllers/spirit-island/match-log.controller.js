"use strict"

import SuccessResponse from "../../responses/sucess.response.js";
import MatchLogService from "../../services/spirit-island/match-log.service.js";
import {ErrorForbidden} from "../../responses/error.response.js";
import mongoose from "mongoose";

class MatchLogController {
  store = async (req, res, next) => {
    try {
      await MatchLogService.store(req.body)
      return new SuccessResponse({
        message: "Match log stored"
      }).send(res)
    } catch (error) {
      next(error)
    }
  }
  bulkStore = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const { match_logs: matchLogs } = req.body
      if (!matchLogs) {
        throw new ErrorForbidden()
      }

      for(let i = 0; i < matchLogs.length; i++) {
        await MatchLogService.store(matchLogs[i])
      }

      await session.commitTransaction();
      await session.endSession();

      return new SuccessResponse({
        message: "Match log stored"
      }).send(res)
    } catch (error) {
      await session.abortTransaction();
      await session.endSession();
      next(error)
    }
  }
  list = async (req, res, next) => {
    try {
      const matchLogs = await MatchLogService.list()
      return new SuccessResponse({
        message: "Match log listed",
        data: matchLogs
      }).send(res)
    } catch (error) {
      next(error)
    }
  }
}

export default new MatchLogController()