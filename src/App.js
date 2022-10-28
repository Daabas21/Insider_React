import { Route, Routes } from 'react-router-dom';
import './App.css';
import Game from './components/Game';
import Games from './pages/Games.jsx';
import Login from './components/Login';
import NavBar from './pages/NavBar';
import Users from './pages/Users.jsx';
import Home from './pages/Home.jsx';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/games' element={<Games />} />
        <Route path='/games/:id' element={<Game />} />
        <Route path='/users' element={<Users />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
