import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthenticatedLayout from "./components/layouts/AuthenticatedLayout";
import GeneralLayout from "./components/layouts/GeneralLayout";
import ErrorPage from "./components/ErrorPage";
import Dashboard from "./components/dashboard/Dashboard";
import Location from "./components/master/Location";
import Login from "./components/Login";
import Type from "./components/master/Type";
import Category from "./components/master/Category";

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
          <Route path="/settings/type" element={<Type />} />
          <Route path="/settings/category" element={<Category />} />
        </Route>
        {/* Error Route */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
