
import React, { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid";


export const GlobalContext = React.createContext()

const dummyData = [
    {   
        id: uuidv4(),
        title: "React Test",
        questions: [
            {
                questionNo: uuidv4(),
                question: "What is React ?",
                options: ["Library", "FrameWork", "Both", "NA"],
                originalAns: "Library"
            },
            {
                questionNo: uuidv4(),
                question: "What is CSS ?",
                options: ["Library", "FrameWork", "Both", "NA"],
                originalAns: "NA"

            },
            {
                questionNo: uuidv4(),
                question: "What is BootStrap ?",
                options: ["Library", "FrameWork", "Both", "NA"],
                originalAns: "Both"
            }
        ],
        date: "26/07/2023",
        studentDetails: {
            name: "Gangadhar",
            standard: "10th",
            section: "C"
        },
        status: "Pending",
        completedAt: "-",
        modifiedAt: "-",
        examOngoing: true,
    },
    {
        id: uuidv4(),
        title: "Javascript Test",
        questions: [
            {
                questionNo: uuidv4(),
                question: "What is Javascript ?",
                options: ["Library", "FrameWork", "Both", "Language"],
                userAns: "Language",
                originalAns: "Language"
            },
            {
                questionNo: uuidv4(),
                question: "What is Material  UI ?",
                options: ["Library", "FrameWork", "Both", "NA"],
                userAns: "Both",
                originalAns: "Library"
            },
            {
                questionNo: uuidv4(),
                question: "What is Node Js ?",
                options: ["Library", "FrameWork", "Both", "NA"],
                userAns: "Both",
                originalAns: "NA"
            }
        ],
        date: "31/07/2023",
        studentDetails: {
            name: "Gangadhar",
            standard: "10th",
            section: "C"
        },
        status: "Completed",
        completedAt: new Date().toLocaleDateString(),
        modifiedAt: "-",
        totalQue: 3,
        totalAns: 1
    },
    {
        id: uuidv4(),
        title: "Packages Test",
        questions: [
            {
                questionNo: uuidv4(),
                question: "What is Javascript ?",
                options: ["Library", "FrameWork", "Both", "Language"],
                userAns: "Language",
                originalAns: "Language"
            },
            {
                questionNo: uuidv4(),
                question: "What is Material  UI ?",
                options: ["Library", "FrameWork", "Both", "NA"],
                userAns: "Both",
                originalAns: "Library"
            },
            {
                questionNo: uuidv4(),
                question: "What is Node Js ?",
                options: ["Library", "FrameWork", "Both", "NA"],
                userAns: "Both",
                originalAns: "NA"
            }
        ],
        date: "28/07/2023",
        studentDetails: {
            name: "Gangadhar",
            standard: "10th",
            section: "C"
        },
        status: "Completed",
        completedAt: new Date().toLocaleDateString(),
        modifiedAt: "-",
        totalQue: 3,
        totalAns: 1
    },
    {
        id: uuidv4(),
        title: "Technical Test",
        questions: [
            {
                questionNo: uuidv4(),
                question: "React is VDom or RDom ?",
                options: ["VDom", "RDom", "Both", "NA"],
                originalAns: "VDom"
            },
            {
                questionNo: uuidv4(),
                question: "Material UI developed by ?",
                options: ["Google", "Facebook", "Both", "NA"],
                originalAns: "Google"
            },
            {
                questionNo: uuidv4(),
                question: "Bootstrap developed by ?",
                options: ["Twitter", "Google", "Both", "NA"],
                originalAns: "Twitter"
            }
        ],
        date: new Date().toLocaleDateString(),
        studentDetails: {
            name: "Gangadhar",
            standard: "10th",
            section: "C"
        },
        status: "Pending",
        completedAt: "-",
        modifiedAt: "-",
    }
]

function QuestionContext({children}) {
    const [assignments, setAssignments] = useState([])
    const [isUserlogged, setIsUserLogged] = useState(false)

    const data = {
        assignments,
        setAssignments,
        isUserlogged,
        setIsUserLogged
    }

    

  return (
    <GlobalContext.Provider value={data}>
        {children}
    </GlobalContext.Provider>
  )
}

export default QuestionContext