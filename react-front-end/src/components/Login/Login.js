
import React, { useContext, useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from '../Context/QuestionContext'
import { login } from '../Services/Services'

function Login(props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [userType, setUserType] = useState('Student')
  const [error, setError] = useState(false)
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
    
  const handleSubmit = async (event) => {
    event.preventDefault()
    if (username.trim() !== '' && password.trim() !== '' && userType.trim() !== ''){
      setError(false)
      try {
        const response =  await login({userName: username, userType, password})
        console.log('Login Response', response)
        localStorage.setItem('username', username)
        localStorage.setItem('userType', userType)
        localStorage.setItem('token', response.data.token)
        setIsUserLogged(true)
        navigate('/')
      } catch (error) {
        setError(true)
        console.log('Login Failed', error)
      }
    }
  }
  return (
    <div className='bg-container'>
        <h1 className='signinBtn'>Sign in</h1>
        <form className='form-container' onSubmit={handleSubmit}>
        {error && <span style={{color: 'red', fontWeight: 500}}>Invalid valid password/username.</span>}
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