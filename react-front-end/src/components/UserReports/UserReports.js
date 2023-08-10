import  React, { useState} from 'react';
import './UserReportsStyle.css'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AssignmentReports from '../AssignmentReports/AssignmentReports';
import MarkReports from '../MarkReports/MarkReports';



function UserReports() {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (      
      <Box sx={{ width: '100%' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'black', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
            <h1>User Assignments Reports</h1>
            <TabList  onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Assignment Reports" value="1" />
              <Tab  label="Marks Reports" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1"><AssignmentReports/></TabPanel>
          <TabPanel value="2"><MarkReports/></TabPanel>
        </TabContext>
      </Box>
  )
}

export default UserReports;
