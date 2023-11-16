
import './App.scss';
import{BrowserRouter,Routes,Route,Link} from 'react-router-dom';
import Quiz1 from './component/Quiz1';
import Home from './component/Home';
import Result from './component/Result';


function App() {
  return (
    <BrowserRouter basename='/pj2/'>
    <header className='header'>
      <div className='headerflex'>
        <h1><Link to='/'>👑우리말을 겨뤄보자👑</Link></h1>
          <ul className='headerul'>
            <li><Link to='/quiz1'>문제</Link></li>
            <li><Link to='/result'>결과</Link></li>
          </ul>
      </div>
    </header>
    <main>
      <Routes>
        <Route path='/' element={<Home/>}/> 
        <Route path = '/quiz1' element ={<Quiz1/>}/>
        <Route path='/result' element ={<Result/>}/>
      </Routes>
    </main>
    </BrowserRouter>
  );
}

export default App;
