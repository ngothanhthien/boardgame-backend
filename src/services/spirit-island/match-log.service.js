"use strict"

import MatchLogModel from "../../models/match.log.model.js";
import {ErrorBadRequest} from "../../responses/error.response.js";

const ADVERSARIES = ['England', 'France', 'Habsburg', 'Habsburg Mining', 'Prussia', 'Russia', 'Sweden', 'Scotland']

class MatchLogService {
  static store = async ({ adversary, fear_stage, invader_card_left, spirits, win, level, real_created_at }, session = null) => {
    if (!ADVERSARIES.includes(adversary)) {
      throw new ErrorBadRequest("Invalid adversary")
    }

    const options = session ? { session } : {};

    await MatchLogModel.create({
      adversary,
      fear_stage,
      invader_card_left,
      spirits,
      win,
      level,
      real_created_at,
      status: "active"
    }, options)
  }
  static list = async () => {
    const matchLogs =await MatchLogModel.find({
      status: "active"
    })

    if (!matchLogs || !matchLogs.length) {
      return null
    }

    const lastMatchLog = matchLogs[matchLogs.length - 1]
    let winTotal = 0
    let loseTotal = 0
    const spiritChart = {}

    matchLogs.forEach(({ win, adversary, spirits }) => {
      if (win) {
        winTotal++
      } else {
        loseTotal++
      }

      spirits.forEach(spirit => {
        if (!spiritChart[spirit]) {
          spiritChart[spirit] = ADVERSARIES.reduce((acc, adversary) => {
            acc[adversary] = {
              win: 0,
              lose: 0
            }
            return acc
          }, {
            total: 0
          })
        }

        spiritChart[spirit][adversary][win ? 'win' : 'lose']++
        spiritChart[spirit].total++
      })
    })

    return {
      total: matchLogs.length,
      last: lastMatchLog,
      win: winTotal,
      lose: loseTotal,
      spirit_chart: spiritChart
    }
  }
}

export default MatchLogService