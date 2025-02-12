import axios from 'axios';

const API_BASE_URL = 'https://hrms-backend-d6l3.onrender.com/api';

// ----------------- Employee APIs -----------------

// Get all employees
export const getEmployees = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/employees`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching employees');
  }
};

export const getEmployeeById = async (id) => {
    return await axios.get(`${API_BASE_URL}/employees/${id}`);
  };

// Create a new employee
export const createEmployee = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/employees`, data);
    return response.data;
  } catch (error) {
    throw new Error('Error creating employee');
  }
};

// Update employee details by ID
export const updateEmployee = async (id, data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/employees/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error('Error updating employee');
  }
};

// Delete an employee by ID
export const deleteEmployee = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/employees/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error deleting employee');
  }
};

// ----------------- Leave APIs -----------------

// Submit a leave request
export const submitLeaveRequest = async (data) => {
  try {
    console.log("My Data",data);
    const response = await axios.post(`${API_BASE_URL}/leaves`, data);
    return response.data;
  } catch (error) {
    throw new Error('Error submitting leave request');
  }
};

// Get all leave requests
export const getLeaveRequests = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/leaves`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching leave requests');
  }
};

// Approve a leave request by ID
export const approveLeaveRequest = async (id) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/leaves/${id}/approve`);
    return response.data;
  } catch (error) {
    throw new Error('Error approving leave request');
  }
};

// Reject a leave request by ID
export const rejectLeaveRequest = async (id) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/leaves/${id}/reject`);
    return response.data;
  } catch (error) {
    throw new Error('Error rejecting leave request');
  }
};
