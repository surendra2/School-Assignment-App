const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const user = require('../models/userModle')
const jsonwebtoken = require('jsonwebtoken')


const fetchStudents = asyncHandler(async (request, response) => {
    console.log("Student data fetching")
    const output = await user.find({userType: "Student"})
    response.json(output)
})

const createUser = asyncHandler( async (request, response) => {
    console.log('user details', request.body)
    const {userName, password, userType} = request.body
    if (!userName || !password || !userType) {
        response.status(400)
        throw new Error('Mandatory Data Missing')
    }
    const userExist = await user.find({userName})

    if (userExist.length > 0){
        response.status(500)
        throw new Error("User already exist with username")
    }
    const hashedPwd = await bcrypt.hash(password, 10)
    const output = await user.create({userName, userType, password: hashedPwd})
    response.status(201).json(output)
});

const login = asyncHandler(async (request, response) => {
    console.log('Login called', request.body)
    const {userName, password, userType} = request.body;
    const dbUser = await user.find({userName})
    
    if(dbUser.length === 0){
        response.status(404)
        throw new Error('Username not found in DB.')
    }
    const passwordMatch = await bcrypt.compare(password, dbUser[0].password)
    if(!passwordMatch || userType !== dbUser[0].userType){
        response.status(400)
        throw new Error('Invalid usernae/password')
        
    }
    const token = jsonwebtoken.sign(
        {user: {
            id: dbUser[0]._id,
            userName: dbUser[0].userName,
            userType: dbUser[0].userType,
        }},
         process.env.SECRET_STRING,
        { expiresIn: '60min'})
    response.json({token});
})

module.exports = {createUser, login, fetchStudents}