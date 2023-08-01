import React, { useContext } from 'react'
import { GlobalContext } from '../Context/QuestionContext'
import { useNavigate } from 'react-router-dom'

function Header() {
    const {isUserlogged, setIsUserLogged} = useContext(GlobalContext)
    console.log('ussdfssdf', isUserlogged)
    const navigate = useNavigate()
    const handleLogout = () => {
        navigate('/login')
        setIsUserLogged(false)
    }
  return (
    <div style={{backgroundColor: 'black',width: '97.1%', padding: '0px 20px 0px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white'}}>
        <h1 style={{fontSize: '18px', fontWeight: '500'}}>Private School</h1>
        {isUserlogged && 
        <div>
          <span style={{marginRight:'20px'}}><span style={{fontWeight: '500'}}>Welcome</span> {localStorage.getItem('username')}</span>
          <button onClick={handleLogout} style={{color: 'white', height: '30px',fontWeight: '500', border: '1px solid white' ,backgroundColor:'transparent'}}>Logout</button></div>}
    </div>
  )
}

export default Header