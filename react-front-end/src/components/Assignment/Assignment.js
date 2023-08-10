
import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../Context/QuestionContext'
import FormDialog from '../utils/Modal'
import TestModal from '../utils/TestModal'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getAssignments } from "../Services/Services";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#566573',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


function Assignment() {
    const {assignments, setAssignments} = useContext(GlobalContext)

    const [dialogProps, setdialogProps] = useState(
      {status: false,
        dialogTitle: 'Create Your Own Questions',
        dialogSubmit: 'Add Assignment',
        primaryBtn: 'Add Question',
        modalType: 'Create'
      })
    const [openAssignment, setOpenAssignment] = useState({status: false, id: 0})
    const userType = localStorage.getItem('userType')
    
    const facultyHeaders = [ 'Created At', 'Modified At', 'Action']
    const studentHeaders = ['Assigned At', 'Completed At', 'Status', 'Action']
    const headers = userType === 'Student' ? studentHeaders : facultyHeaders
    
    const fetchAssignments = async () => {
      try {
          const response = await getAssignments()
          console.log('response mongo db', response)
          setAssignments(response.data)
      } catch (error) {
          console.log(`Error: ${error}`)
      }
  }

  useEffect( () => {
      fetchAssignments()
  }, [])

    const rows = assignments.map(each => {
      if (userType === 'Student'){
        return {title: each.title, createdAt: each.date, completedAt: each.completedAt,
          status: each.status, action: each.status === 'Completed' ? 'View Results': 'Start Exam',}
      }else {
        return {title: each.title, createdAt: each.date, modifiedAt:each.modifiedAt, action: 'Edit'}
      }
    })

    
    const handleCreateAssignment = () => {
      setdialogProps({...dialogProps, status: true})
    }

    const handleOpenAssignment = (index, event) => {
        const id = assignments[index]['id']
        event.target.innerText !== 'Edit' ?
        setOpenAssignment({status: true, id, modalType: event.target.innerText}) :
        setdialogProps({...dialogProps,
          assignmentId: id, 
          dialogTitle: 'Update Your Own Questions',
          dialogSubmit: 'Update Assignment',
          primaryBtn: 'Update & Next Question',
          modalType: 'Update',
          status: true})
    }
  
  return (
    <div style={{width: '100%'}}>
        <TestModal openAssignment={openAssignment} fetchAssignments={fetchAssignments} setOpenAssignment ={setOpenAssignment}/>
        <FormDialog dialogProps={dialogProps} setdialogProps={setdialogProps}/>
        <div style={{width: '100%'}}>
          <div style={{width: '100%'}}>
            <div style={{display: 'flex',flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', padding: '10px 10px 0px 10px', borderBottom: '1px solid black'}}>
              <h1 style={{fontSize:'30px'}}>Assignments</h1>
              {userType === 'Faculty' && <button style={{height: '35px'}} onClick={handleCreateAssignment}>Create Assignment</button>}
            </div>
          </div>
          <TableContainer component={Paper} style={{marginTop: '30px'}}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Assignment Name</StyledTableCell>
                  {headers.map((each) => {
                    return <StyledTableCell key={each} align="right">{each}</StyledTableCell>
                  })}    
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => {
                  return (
                    <StyledTableRow key={row.title}>
                      {Object.keys(row).map(each => {
                        if (each === 'title'){
                          return (<StyledTableCell key={each} component="th" scope="row">
                          {row.title}
                        </StyledTableCell>)
                        }else if (each === 'action'){
                          return (
                            <StyledTableCell key={each} align="right">
                              <button disabled={assignments[index]['examOngoing'] && userType === 'Faculty'} onClick={(event)=>handleOpenAssignment(index, event)}>{row[each]}</button>
                            </StyledTableCell>
                          )
                        }else {
                          return <StyledTableCell key={each} align="right">{row[each]}</StyledTableCell>
                        }
                      })}
                    </StyledTableRow>
                  )})}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        
    </div>
  )
}

export default Assignment;