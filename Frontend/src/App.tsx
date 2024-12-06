import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Sidebar from "./components/dashboard/Sidebar";

import Location from "./components/master/Location";


import './App.css'

const App: React.FC = () => {
  return (
    <Dashboard />
    // <Router>
    //   <div style={{display: "flex"}}>
    //     {/* Sidebar */}
    //     <div style={{width: "200px"}}>
    //       <Sidebar />
    //     </div>

    //     {/* Main Content */}
    //     <div style={{flex: 1, padding: "20px"}}>
    //       <Routes>
    //         <Route path="/dashboard" element={<Dashboard />} />
    //         <Route path="/master/location" element={<Location />} />
    //       </Routes>
    //     </div>
    //   </div>
    // </Router>
  );
};

export default App
