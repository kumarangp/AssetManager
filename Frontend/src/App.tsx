import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Location from "./components/master/Location";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Dashboard Layout */}
        <Route path="/" element={<Dashboard />}>
          {/* Nested Routes */}
          <Route path="dashboard" element={<div>Welcome to Dashboard!</div>} />
          <Route path="settings/location" element={<Location />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
