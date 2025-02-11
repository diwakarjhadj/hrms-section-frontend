import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { getLeaveRequests } from '../services/api';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const LeaveCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await getLeaveRequests();
        const leaves = response || [];

        // Format leave requests into calendar events
        const formattedEvents = leaves.map((leave) => ({
          title: `${leave.employeeId?.name || 'N/A'}: ${leave.leaveType} (${leave.status || 'Pending'})`,
          start: new Date(leave.startDate),
          end: new Date(leave.endDate),
          status: leave.status,
        }));
        console.log("Formatted Events",formattedEvents)
        setEvents(formattedEvents);
      } catch (error) {
        console.error('Error fetching leave requests:', error);
      }
    };

    fetchLeaveRequests();
  }, []);

  return (
    <div style={{ height: '80vh', padding: '20px' }}>
      <h2>Leave Calendar</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: event.status === 'Approved' ? '#28a745' : '#ffc107',
            color: 'white',
          },
        })}
      />
    </div>
  );
};

export default LeaveCalendar;
