import React, { useEffect, useState } from 'react';
import { getLeaveRequests } from '../services/api';

const LeaveList = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const data = await getLeaveRequests();
      setLeaves(data);
    } catch (error) {
      console.error('Error fetching leave requests:', error.message);
    }
  };

  return (
    <div>
      <h2>Leave Requests</h2>
      {leaves.map((leave) => (
        <div key={leave._id}>
          <p>
            Employee: {leave.employeeId.name} | From: {leave.startDate.slice(0, 10)}  
            To: {leave.endDate.slice(0, 10)} | Reason: {leave.reason} | Status: {leave.status}
          </p>
        </div>
      ))}
    </div>
  );
};

export default LeaveList;
