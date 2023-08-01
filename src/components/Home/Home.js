import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import './Home.css'
import Assignment from '../Assignment/Assignment'
import UserReports from '../UserReports/UserReports'

function Home() {
  const [value, setValue] = useState('1');
  const userType = localStorage.getItem('userType')

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Assignments" value="1" />
            {userType === 'Faculty' && <Tab label="Users" value="2" />}
          </TabList>
        </Box>
        <TabPanel value="1"><Assignment/></TabPanel>
        <TabPanel value="2"><UserReports/></TabPanel>
      </TabContext>
    </Box>
  )
}

export default Home;
