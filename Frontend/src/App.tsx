import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthenticatedLayout from "./components/layouts/AuthenticatedLayout";
import GeneralLayout from "./components/layouts/GeneralLayout";
import ErrorPage from "./components/ErrorPage";
import Dashboard from "./components/dashboard/Dashboard";
import Location from "./components/master/Location";
import Login from "./components/Login";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* General Route */}
        <Route element={<GeneralLayout />}>
          <Route path="/login" element={<Login />} />          
        </Route>
        {/* Authenticated Route */}
        <Route element={<AuthenticatedLayout />}>          
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings/location" element={<Location />} />
        </Route>
        {/* Error Route */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
