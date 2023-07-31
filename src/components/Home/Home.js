import React, { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import './Home.css'
import Assignment from '../Assignment/Assignment'
import UserReports from '../UserReports/UserReports'
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../Context/QuestionContext';

function Home() {
  const [value, setValue] = useState('1');
  const navigate = useNavigate()
  const {isUserlogged} = useContext(GlobalContext)
  const userType = localStorage.getItem('userType')

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // useEffect(() => {
  //   if(!isUserlogged){
  //     navigate('/login')
  //   }
  // }, [])

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

// import React, {useState} from 'react';
// import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

// const Home = ({ data }) => {
//   // Customize the colors for each section of the pie chart
//   const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];
//   const [studentData, setStudentData] = useState([
//     { name: 'Student 1', marks: 85 },
//     { name: 'Student 2', marks: 90 },
//     { name: 'Student 3', marks: 70 },
//     { name: 'Student 4', marks: 60 },
//     { name: 'Student 5', marks: 80 },
//     { name: 'Student 6', marks: 90 },
//     // Add more student data here...
//   ]);

//   return (
//     <PieChart width={400} height={400}>
//       <Pie
//         dataKey="marks"
//         isAnimationActive={false}
//         data={studentData}
//         cx={200}
//         cy={200}
//         outerRadius={80}
//         fill="#8884d8"
//         label
//       >
//         {studentData.map((entry, index) => (
//           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//         ))}
//       </Pie>
//       <Tooltip />
//       <Legend />
//     </PieChart>
//   );
// };

// export default Home;
