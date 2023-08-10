import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import { v4 as uuidv4 } from "uuid";
import { GlobalContext } from '../Context/QuestionContext';
import './TestModal.css'
import { submitAssignment } from '../Services/Services';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TestModal({openAssignment, setOpenAssignment, fetchAssignments}) {

  const {assignments, setAssignments} = React.useContext(GlobalContext)
  const [questions, setQuestion] = React.useState([])
  const [currentQuestion, setCurrentQuestion] = React.useState({})
  const [loading, setLoading] = React.useState(true)
  const [anwseredQuesiton, setAnwseredQuestion] = React.useState({})
  const [assignmentDetails, setAssignDetails] = React.useState({})
  
  React.useEffect(() => {
    for (let item of assignments){
        if (item.id === openAssignment.id){
          setAssignDetails(item)
          setQuestion(item.questions)
          setLoading(false)
          setCurrentQuestion({...currentQuestion, index: 0, ...item.questions[0]})
          break
        }
      }
  },[openAssignment, assignments])
  
  const handleNextQuestion = () => {
    if(currentQuestion.index < questions.length){
        setCurrentQuestion({...questions[currentQuestion.index + 1], index: currentQuestion.index + 1,
          userAns: anwseredQuesiton[questions[currentQuestion.index + 1].questionNo]})
    }
  }
  const handlePreviousQuestion = () => {
      setCurrentQuestion({...questions[currentQuestion.index - 1],
         index: currentQuestion.index - 1, 
         userAns: anwseredQuesiton[questions[currentQuestion.index - 1].questionNo]})
  }
  const handleClose = async (event) => {

    if (event.target.innerText === 'SUBMIT'){
      // let ansAsignment = null;
      // const ansQuestions = assignmentDetails.questions.map((each) => {
      //   each['userAns'] = anwseredQuesiton[each.questionNo]
      //   return each
      // })
      // const updatedAssignment = assignments.map((each) => {
      //   if (each.id === openAssignment.id){
      //     ansAsignment = {
      //       ...assignmentDetails,
      //        status: 'Completed',
      //         questions: ansQuestions,
      //     totalQue: assignmentDetails.questions.length,
      //      completedAt: new Date().toLocaleDateString()}
      //   return ansAsignment
      //   }
      //   return each
      // })
      const data = {
        id: openAssignment.id,
        quesnAns: anwseredQuesiton
      }
      try {
        const response = await submitAssignment(data)
        fetchAssignments()
        console.log("Stduent Completed Assignment", response)
      } catch (error) {
        console.log('Error while Submiting assignment', error)
      }
    }
    setOpenAssignment({...openAssignment,status: false, id: 0})
  };

  const handleOptionChange = (event) => {
    setAnwseredQuestion({...anwseredQuesiton, [currentQuestion.questionNo]: event.target.value})
  }

  const getResultOptionCard = (question) => {
    
    return(
      <div>
        {question.options.map(option => {
          return(
            <div key={option} style={{marginBottom: '15px'}}>
            <input readOnly 
            checked={option===question.originalAns || option===question.userAns} 
            className={question.userAns === question.originalAns || option===question.originalAns ? 'correct-ans' : 'error-ans'}
            style={{marginRight: '15px'}}
            id={option} type='radio'  value={option}/>
            <label htmlFor={option}>{option}</label>
          </div>
          )
        })}
      </div>
    )
  }

  const getExamOptionCard = (question) => {
    return(
      question.options.map(each => {
        const attributes = each === question.userAns ? {checked: true} : {}
        return(
          <div key={each} style={{marginBottom: '15px'}}>
            <input {...attributes} onChange={handleOptionChange} style={{marginRight: '15px'}}  id={each} type='radio' name='option' value={each}/>
            <label htmlFor={each}>{each}</label>
          </div>
        )
    })
    )
  }

  const getQuestionCard = (question) => {
    return(
      <div style={{width: '90%', marginLeft: '80px', marginBottom: '20px'}}>
        {loading && <h1>Loding.......</h1>}
        {!loading && 
        <div key={question.question} style={{display: 'flex', flexDirection: 'column'}}>
            <h1>{question.question}</h1>
            <div>
                {openAssignment.modalType === 'View Results' ?
                getResultOptionCard(question) :
                getExamOptionCard(question)}
            </div>      
        </div>}
      </div>
    )
  }

  const generateExamModeView = () =>  {
    return(
        <>
        {getQuestionCard(currentQuestion)}
        <div style={{display: 'flex', marginLeft: '80px', marginRight:'40px', justifyContent: 'space-between'}}>
            <button disabled={currentQuestion.index === 0} onClick={handlePreviousQuestion}>Previous</button>
            <button disabled={currentQuestion.index === questions.length - 1} onClick={handleNextQuestion}>Next</button>
        </div>
        </>
    )
  }

  const generateExameResultView = () => {
    return(
      <div style={{ display: 'flex', flexDirection:'column'}}>
      {questions.map(question => {
        return (<span key={question.question}>{getQuestionCard(question)}</span>)
      })}
      <button style={{alignSelf: 'flex-end', margin: '30px', cursor: 'pointer'}} onClick={handleClose}>Close</button>
      </div>
    )
  }
  
  return (
    <div >
      <Dialog
        fullScreen
        open={openAssignment.status}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{position: 'relative', backgroundColor: 'black' }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }}  component="div">
            {!loading && assignmentDetails.title}
            </Typography>
            <Typography sx={{ ml: 2, flex: 1 }}  component="div">
            {!loading && openAssignment.modalType !== 'Start Exam' ? `Results: ${assignmentDetails.totalAns}/${assignmentDetails.totalQue}` : ''}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              {openAssignment.modalType !== 'Start Exam' ? 'Close' : 'Submit'}
            </Button>
          </Toolbar>
        </AppBar>
        {openAssignment.modalType === 'Start Exam' ? generateExamModeView() : generateExameResultView()}
        
      </Dialog>
    </div>
  );
}