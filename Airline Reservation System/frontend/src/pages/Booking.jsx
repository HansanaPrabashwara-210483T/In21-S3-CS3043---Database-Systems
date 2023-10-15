// Add flight search 
// ID user is authernticated show the users active bookings list
// Ask user to sign in before the booking
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LocationDropdown = () => {
    const [selectedRegion, setSelectedRegion] = useState('All');
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [flightData, setFlightData] = useState([]);
    const [dropdownColumns, setDropdownColumns] = useState([]);

    useEffect(() => {
        const fetchFlightData = async () => {
            try {
                const res = await axios.get('http://localhost:8000/flight');
                setFlightData(res.data);
                setDropdownColumns(['flight_id', 'route_id', 'aircraft_id', 'departure_time', 'arrival_time', 'status', 'delay', 'valid']);
            } catch (err) {
                console.log(err);
            }
        };
        fetchFlightData();
    }, []);

    const handleRegionChange = (e) => {
        const region = e.target.value;
        setSelectedRegion(region);
        if (region === 'All') {
            setFilteredLocations(flightData);
        } else {
            const filtered = flightData.filter((flight) => flight.region === region);
            setFilteredLocations(filtered);
        }
    };

    return (
        <div>
            <label htmlFor="region">Select a Region:</label>
            <select id="region" onChange={handleRegionChange} value={selectedRegion}>
                <option value="All">All Regions</option>
                {flightData.map((flight, index) => (
                    <option key={index} value={flight.id}>
                        {flight.route_id}
                    </option>
                ))}
            </select>

            <label htmlFor="location">Select a Flight:</label>
            <select id="location">
                {filteredLocations.map((location) => (
                    <option key={location.id} value={location.id}>
                        {dropdownColumns.map((column) => location[column]).join(' ')}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LocationDropdown;

