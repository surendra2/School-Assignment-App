import './App.css';
import QuestionContext from './components/Context/QuestionContext';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <QuestionContext>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route exact path='/login' Component={Login}/>
          <Route exact path='/' Component={Home} />
        </Routes>
      </BrowserRouter>
    </QuestionContext>
  );
}

export default App;
