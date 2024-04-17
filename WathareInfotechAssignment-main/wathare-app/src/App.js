// App.js
import React, { useState } from 'react';
import './App.css';
import PlottingData from './PlottingData';
import axios from 'axios';

function App() {
  const [displayData, setDisplayData] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  // Toggle the state when the button is clicked
  const toggleDisplayData = () => {
    setDisplayData(prevState => !prevState);
  };

  const toggleFilter = () => {
    setShowFilter(prevState => !prevState);
  };

  // Handle input change for start time
  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  // Handle input change for end time
  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  // Fetch data based on filter criteria
  const fetchDataByFilter = async (event) => {
    event.preventDefault(); // Prevent form submission
    try {
      const response = await axios.get(`http://localhost:8081/wathare/rangedData/${startTime}/${endTime}`);
      console.log(response.data);
      // Update the startTime and endTime states
      setStartTime(startTime);
      setEndTime(endTime);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
      <div className='container mt-5'>
        <div className='upper-bar d-flex mb-3'>
          <ul className='side-buttons d-flex'>
            <li className='btn btn-light'> 1 hr</li>
            <li className='btn btn-primary'>8 hr</li>
            <li className='btn btn-secondary'>24 hr</li>
            <li className='dropdown dropdown-toggle' type="button" data-bs-toggle="dropdown" aria-expanded="false"><i className='fa-solid fa-bars '>
              <ul className="dropdown-menu">
                <li><button className="dropdown-item" onClick={toggleFilter}>Filter</button></li>
                <li><button className="dropdown-item" >Location and Temperature</button></li>
                <li><button className="dropdown-item" onClick={toggleDisplayData}>{displayData ? "Hide" : "Show"} Data Table</button></li>
              </ul></i></li>
            <li><i className='fa-solid fa-circle-info'></i></li>
          </ul>
        </div>
        <p>{showFilter &&
          <form action="post" onSubmit={fetchDataByFilter}>
            <label className='form-label'>From: </label>
            <input type="time" className='form-control' name="startTime" value={startTime} onChange={handleStartTimeChange} />
            <label className='form-label'>To: </label>
            <input type="time" className='form-control' name="endTime" value={endTime} onChange={handleEndTimeChange} />
            <button type='submit' className='btn btn-primary mt-2'> Search</button>
          </form>
        }</p>
        <p className='text-secondary'>Cycle Status</p>

        {displayData && <PlottingData startTime={startTime} endTime={endTime} />}
      </div>
    </>
  );
}

export default App;
