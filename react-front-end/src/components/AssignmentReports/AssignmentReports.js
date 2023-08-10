import  React, { useState, useEffect, useContext } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';
import AssignmentCard from '../AssignmentCard/AssignmentCard';
import { GlobalContext } from '../Context/QuestionContext';
import './AssignmentReportsStyle.css'
import { fetchStudentAssignments, fetchStudents } from '../Services/userService';


function AssignmentReports() {
  const [sudentsData, setStudentsData] = useState({data: {}, studentsList: []})
  const [username, setUsername] = React.useState('');
  const [userClass, setUserClass] = useState('')
  const [userSection, setUserSection] = useState('')
  const {assignments, setAssignments} = React.useContext(GlobalContext)
  const [noData, setNoData] = useState(false)
  const [loading, setLoading] = useState(true)

  

  const getStudnetsData = async  () => {
    setLoading(true)
    try {
      const response = await fetchStudents()
      console.log('students data', response)
      const studentsList = response.data.map(each => each.userName)
      setStudentsData({data: response.data, studentsList})
      setLoading(false)
    } catch (error) {
      console.log('Students Data Fetcing Error.', error)
      setLoading(false)
    }
  }

  useEffect( () => {
    setAssignments([])
    getStudnetsData()
  },[])

  const handleChangeUsername = (event, newValue) => {
    setUsername(newValue);
  };

  const handleUserClasschange = (event) => {
    setUserClass(event.target.value)
  }
  const handleUserSectionChange = (event) => {
    setUserSection(event.target.value)
  }
  const handleCancel = () => {
    setUserClass('')
    setUserSection('')
    setUsername('')
    setAssignments([])
    setNoData(false)
  }
  const handleSearch = async() => {
    setAssignments([])
    let studentId = null 
    for(let item of sudentsData.data){
      if(item.userName === username){
        studentId = item._id
        break
      }
    }
    try {
      const response = await fetchStudentAssignments(studentId)
      response.data.length === 0 ? setNoData(true) : setAssignments(response.data)
    } catch (error) {
      setNoData(true)
      console.log('Error while fetching Student submitted Assignments', error)
    }
    
  }

  return (
    <div className='user-sub-conainer'>
        {loading && <h1>Loading.....</h1>}
        {!loading && 
        <>
        <div className='filters-container'>
          <p className='sub-heading'>Use student details in filters.</p>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            onChange={handleChangeUsername}
            value={username}
            options={sudentsData.studentsList}
            renderInput={(params) => <TextField {...params} label="Student Name" />}
          />
          <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Class"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleUserClasschange}
              value={userClass}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Section"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleUserSectionChange}
              value={userSection}
            />
            <div className='filter-btn-container'>
              <button onClick={handleCancel}>Cancel</button>
              <button onClick={handleSearch}>Search</button>
            </div>
        </div>
        <AssignmentCard assignments={assignments} noData={noData}/>
        </>}
      </div>
  )
}

export default AssignmentReports;
