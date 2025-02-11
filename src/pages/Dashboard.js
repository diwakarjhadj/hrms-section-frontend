// import React, { useEffect, useState } from 'react';
// import { getEmployees, deleteEmployee} from '../services/api';
// import EmployeeList from '../components/EmployeeList';
// import { useNavigate } from 'react-router-dom';

// const Dashboard = () => {
//   const [employees, setEmployees] = useState([]);
//   const navigate = useNavigate();
//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const response = await getEmployees(); // Debug to verify the structure
//         // const employeeData = Array.isArray(response.data) ? response.data : response.data.employees || [];
//         const employeeData= response;
//         setEmployees(employeeData);
//       } catch (error) {
//         console.error('Error fetching employees:', error);
//         setEmployees([]); 
//       }
//     };

//     fetchEmployees();
//   }, []);
//   const handleEdit = (id) => {
//     navigate(`/edit-employee/${id}`); // Navigate to edit form with employee ID
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this employee?')) {
//       try {
//         await deleteEmployee(id);
//         alert('Employee deleted successfully.');
//         setEmployees(employees.filter((emp) => emp._id !== id));
//       } catch (error) {
//         console.error('Error deleting employee:', error.message);
//       }
//     }
//   };

//   return (
//     <div>
//       <h2>Employee Dashboard</h2>
//       {employees.length > 0 ? (
//         <EmployeeList employees={employees} onEdit={handleEdit} onDelete={handleDelete} />
//       ) : (
//         <p>No Employee Found</p>
//       )}
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from 'react';
import { getEmployees, deleteEmployee, getLeaveRequests } from '../services/api';
import { approveLeaveRequest, rejectLeaveRequest } from '../services/api';
import EmployeeList from '../components/EmployeeList';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [employeeResponse, leaveResponse] = await Promise.all([
          getEmployees(),
          getLeaveRequests(),
        ]);
        setEmployees(employeeResponse);
        console.log("Leave Reponse",leaveResponse,employeeResponse)
        setLeaves(leaveResponse || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-employee/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await deleteEmployee(id);
        alert('Employee deleted successfully.');
        setEmployees(employees.filter((emp) => emp._id !== id));
      } catch (error) {
        console.error('Error deleting employee:', error.message);
      }
    }
  };

  const handleApproveLeave = async (id) => {
    try {
      await approveLeaveRequest(id);
      alert('Leave request approved successfully.');
      setLeaves(leaves.map((leave) => (leave._id === id ? { ...leave, status: 'Approved' } : leave)));
    } catch (error) {
      alert('Error approving leave request: ' + error.message);
    }
  };

  const handleRejectLeave = async (id) => {
    try {
      await rejectLeaveRequest(id);
      alert('Leave request rejected successfully.');
      setLeaves(leaves.map((leave) => (leave._id === id ? { ...leave, status: 'Rejected' } : leave)));
    } catch (error) {
      alert('Error rejecting leave request: ' + error.message);
    }
  };

  return (
    <div className="dashboard">
      <h2>Employee Dashboard</h2>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <>
          <section>
            <h3>Employees</h3>
            {employees.length > 0 ? (
              <EmployeeList employees={employees} onEdit={handleEdit} onDelete={handleDelete} />
            ) : (
              <p>No Employees Found</p>
            )}
          </section>

          <section className="leave-section">
            <h3>Pending Leave Requests</h3>
            {leaves.length > 0 ? (
              <table className="leave-table">
                <thead>
                  <tr>
                    <th>Employee Name</th>
                    <th>Leave Type</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leaves.map((leave) => (
                    <tr key={leave._id}>
                      <td>{leave.employeeId?.name || 'N/A'}</td>
                      <td>{leave.leaveType}</td>
                      <td>{new Date(leave.startDate).toLocaleDateString()}</td>
                      <td>{new Date(leave.endDate).toLocaleDateString()}</td>
                      <td>{leave.reason}</td>
                      <td>{leave.status || 'Pending'}</td>
                      <td>
                        {leave.status === 'Pending' ? (
                          <>
                            <button onClick={() => handleApproveLeave(leave._id)} className="approve-btn">
                              Approve
                            </button>
                            <button onClick={() => handleRejectLeave(leave._id)} className="reject-btn">
                              Reject
                            </button>
                          </>
                        ) : (
                          <span>{leave.status}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No leave requests found.</p>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default Dashboard;
