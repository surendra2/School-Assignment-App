
const {constants} = require('../constants')

const errorHandler = (err, req, res, next) => {
    
    const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500 ;
    console.log('Error handlers',res.statusCode, statusCode)
    switch (statusCode) {
        case constants.NOT_FOUND:
            res.json({ title:'Page Not Found', message: err.message, stackTrace: err.stack})
            break;
        case constants.VALIDATION_ERROR:
            res.json({ title:'Validation Failed', message: err.message, stackTrace: err.stack})
            break;
        case constants.UNAUTHORIZED:
            res.json({ title:'Unauthorized', message: err.message, stackTrace: err.stack})
            break;
        case constants.FORBIDEN:
            res.json({ title:'Forbidden', message: err.message, stackTrace: err.stack})
            break;   
        default:
            res.status(500).json({ title:'Server Error', message: err.message, stackTrace: err.stack})
            break;
    }
    

}

module.exports = errorHandler