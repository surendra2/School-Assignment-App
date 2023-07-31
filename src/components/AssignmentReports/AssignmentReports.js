import  React, { useState, useEffect, useContext } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';
import AssignmentCard from '../AssignmentCard/AssignmentCard';
import { GlobalContext } from '../Context/QuestionContext';
import './AssignmentReportsStyle.css'

const dummyUsers = ['Gangadhar', 'Naveen']

function AssignmentReports() {
  const [username, setUsername] = React.useState('');
  const [userClass, setUserClass] = useState('')
  const [userSection, setUserSection] = useState('')
  const [assignments, setAssignments] = useState([])
  const [noData, setNoData] = useState(false)

  const globalData = useContext(GlobalContext)



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
  }
  const handleSearch = () => {
    setNoData(false)
    setAssignments([])
    const filteredAsigns = globalData.assignments.filter(each => {
      const {name, standard, section } = each.studentDetails
      if((name === username|| standard === userClass || section === userSection) && each.status === 'Completed' ){
        return true
      }
      return false
    })
    filteredAsigns.length === 0 ? setNoData(true) : setAssignments(filteredAsigns)
  }

  return (
    <div className='user-sub-conainer'>
        <div className='filters-container'>
          <p className='sub-heading'>Use student details in filters.</p>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            onChange={handleChangeUsername}
            value={username}
            options={dummyUsers}
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
      </div>
  )
}

export default AssignmentReports;
