import React, { useState } from 'react';
import { submitLeaveRequest } from '../services/api';
import '../styles/LeaveRequestForm.css';
import { useNavigate } from 'react-router-dom';
const LeaveRequestForm = () => {
  const [leaveRequest, setLeaveRequest] = useState({
    employeeId: '',
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setLeaveRequest({ ...leaveRequest, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitLeaveRequest(leaveRequest);
      alert('Leave request submitted successfully.');
      setLeaveRequest({
        employeeId: '',
        leaveType: '',
        startDate: '',
        endDate: '',
        reason: '',
      });

      // Redirect to Dashboard or Leave List
      navigate('/');
    } catch (error) {
        alert('Error submitting leave request:', error.message);
      console.error('Error submitting leave request:', error.message);
    }
  };

  return (
    <div className="leave-request-form-container">
      <h2>Submit Leave Request</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Employee ID:</label>
          <input
            type="text"
            name="employeeId"
            value={leaveRequest.employeeId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Leave Type:</label>
          <select name="leaveType" value={leaveRequest.leaveType} onChange={handleChange} required>
            <option value="">Select Leave Type</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Paid Leave">Paid Leave</option>
          </select>
        </div>

        <div className="form-group">
          <label>Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={leaveRequest.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>End Date:</label>
          <input
            type="date"
            name="endDate"
            value={leaveRequest.endDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Reason:</label>
          <textarea
            name="reason"
            value={leaveRequest.reason}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default LeaveRequestForm;
