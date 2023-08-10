const mongoose = require('mongoose')

const asignSchema = mongoose.Schema({
    id: String,
    title: String,
    questions: [
        {
            questionNo: String,
            question: String,
            options: [String],
            originalAns: String
        }
    ],
    date: String,
    status: String,
    completedAt: String,
    modifiedAt: String,
    totalQue: Number,
    totalAns: Number,
    examOngoing: Boolean
},{ timestaps: true})

module.exports = mongoose.model('Assignment', asignSchema)