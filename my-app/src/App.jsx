import React from "react";
import { Home } from './Home';
import './App.css';
import { Page1 } from './pages/page1'
import { Page2 } from './pages/page2'
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

const App=()=> {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/page1' element={<Page1 />} />
          <Route path='/page2' element={<Page2 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
