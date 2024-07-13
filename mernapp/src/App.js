import './App.css';
import React from 'react';
import Home from './screens/Home';
import Login from './screens/Login';
// import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';  //npm i bootstrap-dark-5 bootstrap
// import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
// import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './screens/Signup'
import { CartProvider } from './components/ContextReducer.js';
import MyOrder from './screens/MyOrder';

function App() {
  return (
    <CartProvider>
          <Router>
      <div>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/createuser" element={<Signup />} />
            <Route exact path="/myOrder" element={<MyOrder />} />
          </Routes>
        </div>
      </div>
    </Router>
    </CartProvider>
  );
}

export default App;
