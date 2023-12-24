import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import Home from './Components/Home';
import Identity from './Components/Identity';
import SuccessRate from './Components/SuccessRate';
import Records from './Components/History';
import NavBar from './Components/NavBar';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={[<NavBar/>,<Home/>]}></Route>
          <Route exact path="/Identity" element={[<NavBar/>,<Identity/>]}></Route>
          <Route exact path="/Records" element={[<NavBar/>,<Records/>]}></Route>
          <Route exact path="/Success-rate" element={[<NavBar/>,<SuccessRate/>]}></Route>
          {/* <Route exact path="/" element={[<NavBar/>,<Home/>]}></Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
