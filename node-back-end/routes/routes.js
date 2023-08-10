const express = require('express')
const router = express.Router()
const {
    getAssignments,
    createAssignment,
    updateAssignment,
    createStudentAssignment,
    fetchStudentAssignment 
} = require('../controllers/assignmentController')


router.route('/').get(getAssignments)
router.route('/create').post(createAssignment)
router.route('/update').put(updateAssignment)
router.route('/submit').post(createStudentAssignment)
router.route('/student').get(fetchStudentAssignment)




module.exports = router