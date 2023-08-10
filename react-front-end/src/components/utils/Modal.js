import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { GlobalContext } from '../Context/QuestionContext';
import { v4 as uuidv4 } from 'uuid';
import { createAssignment, updateAssignment } from '../Services/Services';

export default function FormDialog({dialogProps, setdialogProps}) {

    const [title, setTitle] = React.useState('')
    const [questions, setQuestions] = React.useState([])
    const [currentQuestion, setCurrentQuestion] = React.useState('')
    const [optionOne, setOptionOne] = React.useState('')
    const [optionTwo, setOptionTwo] = React.useState('')
    const [optionThree, setOptionThree] = React.useState('')
    const [optionFour, setOptionFour] = React.useState('')
    const [currentAns, setCurrentAns] = React.useState('')
    const currentAsignRef = React.useRef(null)
    
    const {assignments, setAssignments} = React.useContext(GlobalContext)


    const getNextQuestion = (index) => {
      const question = currentAsignRef.current.assignment.questions[index]
      currentAsignRef.current = {...currentAsignRef.current, index}
      if (index < currentAsignRef.current.assignment.questions.length ){
        setCurrentQuestion(question.question)
        setOptionOne(question.options[0])
        setOptionTwo(question.options[1])
        setOptionThree(question.options[2])
        setOptionFour(question.options[3])
        setCurrentAns(question.originalAns)
      }
    }

    React.useEffect(() => {
      if(dialogProps.modalType === 'Update'){
        for(let each of assignments){
          if (each.id === dialogProps.assignmentId){
            currentAsignRef.current = {assignment: each ,index: 0}
            setTitle(each.title)
            setQuestions(each.questions)
            getNextQuestion(0)
          }
        }
      }
    },[dialogProps, assignments])
   
    
    const handleAddAssignment = async () => {
      if (dialogProps.modalType === 'Update'){
        let updatedAsign = null 
        const updatedAssigments = assignments.map(each => {
          
          if (dialogProps.assignmentId === each.id){
              updatedAsign = {...each, questions, title, modifiedAt: new Date().toLocaleDateString()}
            return updatedAsign
          }
          return each
        })

        try {
          const response = await updateAssignment(updatedAsign)
          setAssignments(updatedAssigments)
          console.log("assignment Updated", response)
        } catch (error) {
          console.log('Error while Creating', error)
        }
      }else {
        const data = {
          id: uuidv4(),
          title,
          questions,
          date: new Date().toLocaleDateString(),
          status: 'Pending',
          modifiedAt: '-',
          completedAt: '-',
        }
        try {
          const response = await createAssignment(data)
          setAssignments([...assignments, response.data])
          console.log("assignment created", response)
        } catch (error) {
          console.log('Error while Creating', error)
        }
      }
      setdialogProps({...dialogProps, status: false, modalType: 'Create'})
      setTitle('')
      resetQuestionProps()
      setQuestions([])
    }
  
  const handleAddQuestion = () => {
    if (dialogProps.modalType === 'Update'){
      const index = currentAsignRef.current.index 
      const updatedQuestion = questions.map((each, innerIndex) => {
        if (index === innerIndex){
          return {...each, 
            question: currentQuestion,
            originalAns: currentAns,
            options: [optionOne, optionTwo, optionThree, optionFour]}
        }
        return each
      })
      setQuestions(updatedQuestion)
      getNextQuestion(index + 1)
    }else{
      setQuestions([...questions, {
        questionNo: uuidv4(),
        question: currentQuestion,
        originalAns: currentAns,
        options: [optionOne, optionTwo, optionThree,optionFour]
      }])
      resetQuestionProps()
    }
  }
  const handleClose = () => {
    setdialogProps({...dialogProps, status: false, modalType: 'Create'})
    setTitle('')
    resetQuestionProps()
    setQuestions([])
  };
  const resetQuestionProps = () => {
    setCurrentQuestion('')
    setOptionFour('')
    setOptionThree('')
    setOptionTwo('')
    setOptionOne('')
    setCurrentAns('')
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleOptionOne = (event) => {
    setOptionOne(event.target.value)
  }
  const handleOptionTwo = (event) => {
    setOptionTwo(event.target.value)
  }
  const handleOptionThree = (event) => {
    setOptionThree(event.target.value)
  }
  const handleOptionFour = (event) => {
    setOptionFour(event.target.value)
  }
  const handleQuestionChange = (event) => {
    setCurrentQuestion(event.target.value)
  }
  const handleAnwser = (event) => {
    setCurrentAns(event.target.value)
  }

  const disableAttr = (dialogProps.modalType === 'Update' && currentAsignRef.current !== null) ? 
  currentAsignRef.current.index < currentAsignRef.current.assignment.questions.length ?
  {} : {disabled: true} : {}

  return (
    <div>
      <Dialog open={dialogProps.status} onClose={handleClose}>
        <DialogTitle style={{display: 'flex', justifyContent: 'space-between'}}>{dialogProps.dialogTitle}
        <Button onClick={handleAddAssignment}>{dialogProps.dialogSubmit}</Button>
        </DialogTitle>
        
        <DialogContent>
          <DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Exam Title"
            type="email"
            fullWidth
            variant="standard"
            onChange={handleTitleChange}
            value={title}
          />
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Enter Your Question"
            type="email"
            fullWidth
            variant="standard"
            onChange={handleQuestionChange}
            value={currentQuestion}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Option1"
            type="email"
            fullWidth
            variant="standard"
            onChange={handleOptionOne}
            value={optionOne}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Option2"
            type="email"
            fullWidth
            variant="standard"
            onChange={handleOptionTwo}
            value={optionTwo}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Option3"
            type="email"
            fullWidth
            variant="standard"
            onChange={handleOptionThree}
            value={optionThree}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Option4"
            type="email"
            fullWidth
            variant="standard"
            onChange={handleOptionFour}
            value={optionFour}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Anwser"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleAnwser}
            value={currentAns}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button {...disableAttr} onClick={handleAddQuestion}>{dialogProps.primaryBtn}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}