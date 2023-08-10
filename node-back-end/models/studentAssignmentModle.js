const mongoose = require('mongoose')

const studnetAsignSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    id: {
        type: String,
        required: true,
        ref: "Assignment"
    },
    title: String,
    questions: [
        {
            questionNo: String,
            question: String,
            options: [String],
            originalAns: String,
            userAns: String
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

module.exports = mongoose.model('StudentAssignment', studnetAsignSchema)