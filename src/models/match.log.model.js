import { Schema, model } from "mongoose"

const DOCUMENT_NAME = "matchLog"
const COLLECTION_NAME = "matchLogs"

const MatchLogSchema = new Schema({
  adversary: {
    type: String,
    required: true
  },
  fear_stage: {
    type: Number,
    required: true
  },
  invader_card_left: {
    type: Number,
    required: true
  },
  spirits: {
    type: [String],
    required: true
  },
  win: {
    type: Boolean,
    required: true
  },
  level: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  real_created_at: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  collection: COLLECTION_NAME
})

export default model(DOCUMENT_NAME, MatchLogSchema)