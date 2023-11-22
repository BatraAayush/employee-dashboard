import { Route, Routes } from 'react-router';
import './App.css';
import { Home } from './pages/Home/Home';
import Details from './pages/Details/Details';

function App() {
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/details/:id" element={<Details/>}/>
    </Routes>
    </div>
  );
}

export default App;
