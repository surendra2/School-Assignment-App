
import React, { useContext, useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from '../Context/QuestionContext'

function Login(props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [userType, setUserType] = useState('Student')
  const {setIsUserLogged} = useContext(GlobalContext)
  const navigate = useNavigate()

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleUserType = (event) => {
    setUserType(event.target.value)
  }
    
  const handleSubmit = (event) => {
    event.preventDefault()
    if (username.trim() !== '' && password.trim() !== '' && userType.trim() !== ''){
      localStorage.setItem('username', username)
      localStorage.setItem('userType', userType)
      setIsUserLogged(true)
      navigate('/')
    }
  }
  return (
    <div className='bg-container'>
        <h1 className='signinBtn'>Sign in</h1>
        <form className='form-container' onSubmit={handleSubmit}>
        <label className='label' htmlFor='usertype'>User type</label>
            <select className='selectTag' onChange={handleUserType}>
              <option className='options' value='Student'>Student</option>
              <option className='options' value='Faculty'>Faculty</option>
            </select>
            <label className='label' htmlFor='username'>Username</label>
            <input onChange={handleUsernameChange} className='input-el' id='username' type='text' />
            <label className='label' htmlFor='password'>Password</label>
            <input onChange={handlePasswordChange} className='input-el' id='password' type='password' />
            <button className='login-button' type='submit'>Login</button>
        </form>
    </div>
  )
}

export default Login