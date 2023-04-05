import { Routes, Route } from 'react-router-dom'

import Home from './Pages/Home';
import TripPlanner from './Pages/TripPlanner';
import Cities from './Pages/Cities';
import City from './Pages/City';
import Attraction from './Pages/Attraction'

function App() {
  return (
    <Routes>
      <Route path='/' index element={<Home />}></Route>
      <Route path='orase' element={<Cities />}></Route>
      <Route path='oras'>
        <Route path="bucuresti" element={<City />} />
        <Route path="brasov" element={<City />} />
        <Route path="cluj-napoca" element={<City />} />
        <Route path="timisoara" element={<City />} />
        <Route path="constanta" element={<City />} />
      </Route>
      <Route path='atractie/:city/:atractie' element={<Attraction />}>

      </Route>
      <Route path='calatorie' element={<TripPlanner />}></Route>
    </Routes>
  );
}

export default App;
