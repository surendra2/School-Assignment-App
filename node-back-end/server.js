const express = require('express')
const dotEnv = require('dotenv').config()
const mongoose = require('mongoose');
const router = require('./routes/routes');
const cors = require('cors');
const validateToken = require('./protectedRoute/protectedRoute');
const {createUser, login, fetchStudents} = require('./controllers/userController')
const errorHandler =  require('./protectedRoute/errorHandler')
const app = express()

const port = process.env.PORT || 5001 ;
app.use(express.json())
app.use(cors())

app.use('/assignments', validateToken, router)
app.use('/students', validateToken, fetchStudents)
app.use('/login', login)
app.use('/register', createUser)
app.use(errorHandler)


app.listen(port, async () => {
    try {
        const dbConnection = await mongoose.connect(process.env.DB_CONNECTION)
        console.log(`DB Connection established with ${dbConnection.connection.host}, ${dbConnection.connection.name}`)
        console.log(`app listening at http://localhost:${port}`);
        
    } catch (error) {
        console.log(`Error: ${error}`)
        process.exit(1)
    }
})