import axios from "axios";

export const fetchStudentAssignments = async (studentId) => {
    console.log('fetch students assingments', studentId)
    const options = {
        url: 'http://localhost:5000/assignments/student',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            studentId,
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
    }
    const response = await axios(options)
    return response;
}

export const fetchStudents = async (data) => {
    console.log('fetchStudents',  data)
    const options = {
        url: 'http://localhost:5000/students',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        data: data
    }
    const response = await axios(options)
    return response;
}