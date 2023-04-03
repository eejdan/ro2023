import { Routes, Route } from 'react-router-dom'

import Home from './Pages/Home';
import TripPlanner from './Pages/TripPlanner';
import Cities from './Pages/Cities';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/orase' element={<Cities />}></Route>
      <Route path='/calatorie' element={<TripPlanner />}></Route>
    </Routes>
  );
}

export default App;
