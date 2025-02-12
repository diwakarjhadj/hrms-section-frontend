import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEmployee } from '../services/api';
import '../styles/EmployeeForm.css';

const EmployeeForm = () => {
  const [employee, setEmployee] = useState({
    name: '',
    department: '',
    contact: '',
    email: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEmployee(employee);
      alert('Employee created successfully.');
      setEmployee({
        name: '',
        department: '',
        contact: '',
        email: ''
      });

      // Redirect to the dashboard
      navigate('/');
    } catch (error) {
        alert('Error creating employee:', error.message);
      console.error('Error creating employee:', error.message);
    }
  };

  return (
    <div className="employee-form-container">
      <h2>Create Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={employee.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Department:</label>
          <input type="text" name="department" value={employee.department} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Contact:</label>
          <input type="tel" name="contact" value={employee.contact} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={employee.email} onChange={handleChange} required />
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default EmployeeForm;
