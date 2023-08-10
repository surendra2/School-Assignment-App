
const Assignment = require('../models/assignmentModel')
const studentAssignmentModle = require('../models/studentAssignmentModle')
const asyncHandler = require('express-async-handler')



const getAssignments = asyncHandler(async (request, resposne) => {
    console.log('Get Assignments', request.user)
    let assignments = await Assignment.find()
    if (request.user.userType === 'Student'){
        const userAssign = await studentAssignmentModle.find({userId: request.user.id})
        const completedAssign = userAssign.map(each => each.id)
        let filterAsign = [];
        for (let each of assignments){
            
            if(!completedAssign.includes(each.id)){
                const filterQuestions = each.questions.map(item => {
                    
                    return {
                        questionNo: item.questionNo,
                        question: item.question,
                        options: item.options,
                        _id: item._id
                    }
                })
                
                each['questions'] = filterQuestions
                filterAsign.push(each)
            }
        }

        assignments = [...filterAsign, ...userAssign]
    }
    resposne.json(assignments) 
})

const createAssignment = asyncHandler(async(request, response) => {
    console.log('request body', request.body)
    const output =  await Assignment.create(request.body)
    response.status(201).json(output);
})

const updateAssignment =asyncHandler( async(request, response) => {
    console.log('request', request.body)
    const output = await Assignment.findById(request.body._id)
    if(!output){
        response.status(404)
        throw new Error('Required data not found in DB.')
    }
    const updateResp = await Assignment.findByIdAndUpdate(
        request.body._id,
        request.body,
        {new: true}
    )
    response.json(updateResp);
})

const createStudentAssignment = asyncHandler( async  (request, response) => {
    console.log('request', request.body)
    const {id, quesnAns} = request.body
    const facultyAsign = await Assignment.findOne({id: id})
    let totalCorrectAns = 0 
    let updatedQuestions = []
    for (let item of facultyAsign.questions){
        if(item.originalAns === quesnAns[item.questionNo]){
            totalCorrectAns += 1
        }
        const data =  {
            questionNo: item.questionNo,
            question: item.question,
            options: item.options,
            userAns: quesnAns[item.questionNo],
            originalAns: item.originalAns,
            _id: item._id
        }
        updatedQuestions.push(data)
    }
    const finalData = {
        userId: request.user.id,
        id: id,
        title: facultyAsign.title,
        questions: updatedQuestions,
        date: facultyAsign.date,
        status: 'Completed',
        completedAt: new Date().toLocaleDateString(),
        totalQue: updatedQuestions.length,
        totalAns: totalCorrectAns,
        studentDetails: {
            userName: request.user.userName,
            userClass: request.user.userClass
        }
    }
    const output = await studentAssignmentModle.create(finalData)
    response.status(201).json(output)
})

const fetchStudentAssignment =asyncHandler( async (request, response) => {
    console.log('Student Assignemets ', request.headers.studentid)
    const output =  await studentAssignmentModle.find({userId: request.headers.studentid})
    response.json(output)
})


module.exports = { 
    getAssignments,
    createAssignment, 
    updateAssignment,
    createStudentAssignment, 
    fetchStudentAssignment
}