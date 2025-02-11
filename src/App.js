import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CreateEmployeePage from './pages/CreateEmployeePage';
import LeaveRequestPage from './pages/LeaveRequestPage';
import EditEmployeeForm from './components/EditEmployeeForm';
import LeaveCalendar from './components/LeaveCalendar';
import Navbar from './components/Navbar';
import './styles/App.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create-employee" element={<CreateEmployeePage />} />
          <Route path="/leave-request" element={<LeaveRequestPage />} />
          <Route path="/edit-employee/:id" element={<EditEmployeeForm />} />
          <Route path="/leave-calendar" element={<LeaveCalendar />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
