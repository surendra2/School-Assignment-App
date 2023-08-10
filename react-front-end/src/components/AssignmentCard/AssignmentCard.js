import React, { useState } from 'react'
import './AssignmentCardStyles.css'
import TestModal from '../utils/TestModal'

function AssignmentCard({assignments, noData}) {
    const [openAssignment,  setOpenAssignment] = useState({status: false, id: 0, modalType: 'View Results'})

    const handleOpenAssignment = (id) => {
        setOpenAssignment({...openAssignment, status: true, id})
    }

  return (
    <>
        <TestModal openAssignment={openAssignment} setOpenAssignment={setOpenAssignment} />
        <div style={{display: 'flex', width: '60%'}}>
            {!assignments.length && !noData &&
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                <h1> Use filters to see students information</h1>
            </div>}
            {noData &&
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                <h1>No assignment found. Please try again!.</h1>
            </div>}
            { assignments.length > 0 &&
                <div style={{width: '100%', padding: '15px'}}>
                    <h1>Student Assignments </h1>
                    <ul className='card-container'>
                        {assignments.map(each => {
                            return(
                                <li className='card' key={each.id}>
                                    <h1 style={{color: 'blue', fontSize: '25px'}}>{each.title}</h1>
                                    <p>Exam Date: {each.date}</p>
                                    <p>Marks: {each.totalAns}</p>
                                    <button onClick={() => handleOpenAssignment(each.id)}>Open</button>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            }
        </div>
    </>
    
  )
}

export default AssignmentCard