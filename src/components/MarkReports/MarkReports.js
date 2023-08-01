import React, { useState } from 'react'
import { Autocomplete } from '@mui/material'
import { TextField } from '@mui/material';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import CustomeTable from '../Table/CustomeTable';


const data = {
    All_Subjects: [{name: 'Raju', marks: 27},
        {name: 'Muni', marks: 20},
        {name: 'Naveen', marks: 30},
        {name: 'Mohan', marks: 25},
        {name: 'Surendra', marks: 26},
        {name: 'Gangadhar', marks: 23},
    ],
    React: [{name: 'Raju', marks: 7,},
        {name: 'Mohan', marks: 9,},
        {name: 'Naveen', marks: 8},
        {name: 'Muni', marks: 5},
        {name: 'Gangadhar', marks: 8},
        {name: 'Surendra', marks: 9}],
    Python: [{name: 'Raju', marks: 6,},
        {name: 'Muni', marks: 9,},
        {name: 'Naveen', marks: 9},
        {name: 'Mohan', marks: 7},
        {name: 'Gangadhar', marks: 6},
        {name: 'Surendra', marks: 4}],
    AWS: [{name: 'Raju', marks: 9,},
        {name: 'Naveen', marks: 4},
        {name: 'Mohan', marks: 5},
        {name: 'Surendra', marks: 6},
        {name: 'Gangadhar', marks: 8},
        {name: 'Muni', marks: 9,}],
    '10th': ['Raju', 'Naveen'],
    '9th': ['Mohan', 'Surendra'],
    '8th': ['Gangadhar', 'Muni'],
}

const chartFilters = ['Mark wise reports', 'Subject wise reports', 'Class wise reports']
const subjectFilters = ['All_Subjects', 'React', 'Python', 'AWS']
const classFilters = ['10th', '9th', '8th']  
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];


function MarkReports() {
    const [reportType, setReportType] = useState(chartFilters[0])
    const [subject, setSubject] = useState(subjectFilters[0])
    const [currentClass, setCurrentClass] = useState(classFilters[0])
    const [chartData, setChartData] = useState(data['All_Subjects'])

    const handleReportTypeChange = (event, newValue) => {
        if(newValue !== null) {
            setSubject(subjectFilters[0])
            setCurrentClass(classFilters[0])
            setReportType(newValue)
            if(newValue === chartFilters[2]){
                getFilteredData(subjectFilters[0], currentClass)
                return 
            }
            setChartData(data[subjectFilters[0]])

        }
    }
    const getFilteredData = (subject, selectedClass) => {
        const students = data[selectedClass]
        const newChartData = data[subject].filter(each => students.includes(each.name))
        setChartData(newChartData)
    }
    const handleChangeSubject = (event, newValue) => {
        if(newValue !== null){
            setSubject(newValue)
            if(reportType === chartFilters[2]){
                getFilteredData(newValue, currentClass)
                return 
            }
            setChartData(data[newValue])
        }
    }
    const handleClassChange = (event, newValue) => {
        if (newValue !== null){
            setCurrentClass(newValue)
            getFilteredData(subject, newValue)
        }
    }

  return (
    <div style={{width: '100%', paddingTop: '20px'}}>
        <div style={{display: 'flex', flexWrap: 'wrap',width: '100%', gap: '30px'}}>
            <Autocomplete
                sx={{minWidth: '35%', flexGrow: '1'}}
                disablePortal
                id="combo-box-demo"
                onChange={handleReportTypeChange}
                value={reportType}
                options={chartFilters}
                renderInput={(params) => <TextField {...params} label="Select type of mark report" />}
            />
            <Autocomplete
                sx={{minWidth: '30%', flexGrow: '1'}}
                disablePortal
                disabled={reportType === chartFilters[0] }
                id="combo-box-demo"
                onChange={handleChangeSubject}
                value={subject}
                options={subjectFilters}
                renderInput={(params) => <TextField {...params} label="Select subject" />}
            />
            <Autocomplete
                sx={{minWidth: '30%', flexGrow: '1'}}
                disablePortal
                disabled={reportType===chartFilters[0] || reportType===chartFilters[1]}
                id="combo-box-demo"
                onChange={handleClassChange}
                value={currentClass}
                options={classFilters}
                renderInput={(params) => <TextField {...params} label="Select class" />}
            />
        </div>
        <div style={{display: 'flex', justifyContent:'space-around', alignItems: 'center', flexWrap: 'wrap'}}>
            <div>
                <PieChart width={500} height={400}>
                    <Pie
                        dataKey="marks"
                        isAnimationActive={true}
                        data={chartData}
                        cx={200}
                        cy={200}
                        outerRadius={100}
                        fill="#8884d8"
                        label
                    >
                    {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </div>
            <div style={{minWidth: '300px', flexGrow: '1', marginTop: '30px'}}>
                <CustomeTable tableData={chartData}/>
            </div>
        </div>
    </div>
  )
}

export default MarkReports