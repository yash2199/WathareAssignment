// StatusStrip.js
import React from 'react';

const StatusStrip = ({ data, startTime, endTime }) => {
  const startTimeMs = new Date(startTime).getTime();
  const endTimeMs = new Date(endTime).getTime();
  const totalTime = (endTimeMs - startTimeMs) / 1000; // Convert milliseconds to seconds

  console.log('startTime:', startTime);
  console.log('endTime:', endTime);
  console.log('totalTime:', totalTime);

  const getStatusColor = (timestamp) => {
    const event = data.find((e) => e.timestamp === timestamp);
    return event ? (event.machine_status === 1 ? 'green' : 'yellow') : 'transparent';
  };

  return (
    <div style={{ display: 'flex', marginTop: '20px' }}>
      {[...Array(totalTime)].map((_, index) => {
        const timestamp = new Date(startTimeMs + index * 1000); // Assuming each unit represents 1 second
        return (
          <div
            key={index}
            style={{
              width: '1px',
              height: '20px',
              backgroundColor: getStatusColor(timestamp),
            }}
          />
        );
      })}
    </div>
  );
};

export default StatusStrip;
