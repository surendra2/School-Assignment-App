const jsonwebtoken = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const validateToken = asyncHandler( async (request, response, next) => {
    
    const token = request.headers.authorization || request.headers.Authorization 
    console.log('server token', token)
    if(!token){
        response.status(400)
        throw new Error("Missing required data.")
    }
    const authToken = token.split(" ")[1]
    jsonwebtoken.verify(authToken, process.env.SECRET_STRING, (error, decoded) => {
        if (error){
            response.json('Invalid Access')
            throw new Error('Invalid Access')
        }
        request.user = decoded.user
        next();
    })
})


module.exports = validateToken