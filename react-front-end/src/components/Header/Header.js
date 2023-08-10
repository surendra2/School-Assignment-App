import React from 'react'
import { useNavigate } from 'react-router-dom'

function Header() {
    
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('username')
        localStorage.removeItem('userType')
        localStorage.removeItem('token')
        navigate('/login')
    }
  return (
    <div style={{backgroundColor: 'black',width: '97.1%', padding: '0px 20px 0px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white'}}>
        <h1 style={{fontSize: '18px', fontWeight: '500'}}>Private School</h1>
        {token && 
        <div>
          <span style={{marginRight:'20px'}}><span style={{fontWeight: '500'}}>Welcome</span> {localStorage.getItem('username')}</span>
          <button onClick={handleLogout} style={{color: 'white', height: '30px',fontWeight: '500', border: '1px solid white' ,backgroundColor:'transparent'}}>Logout</button></div>}
    </div>
  )
}

export default Header