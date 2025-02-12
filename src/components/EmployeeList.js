import React from 'react';
import '../styles/EmployeeList.css';

const EmployeeList = ({ employees, onDelete, onEdit }) => {
  return (
    <table className="employee-table">
      <thead>
        <tr>
          <th>Emp. ID.</th>
          <th>Name</th>
          <th>Department</th>
          <th>Contact</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee._id}>
            <td>{employee.id}</td>
            <td>{employee.name}</td>
            <td>{employee.department}</td>
            <td>{employee.contact}</td>
            <td>{employee.email}</td>
            <td>
              <button className="edit-btn" onClick={() => onEdit(employee._id)}>
                Edit
              </button>
              <button className="delete-btn" onClick={() => onDelete(employee._id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeList;
