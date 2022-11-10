import React, { useEffect, useState, Link } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const JourneyResults = () => {
    const [journeys, setJourneys] = useState([]);
    let history = useHistory();


    useEffect(() => {
        const fetchJourneys = async () => {
            const result = await axios.get(`${REACT_APP_SERVER_URL}/journeys/all`);
            console.log(result.data);
            setJourneys(result.data);
        };
        fetchJourneys();
    }, []);

    if (journeys) {
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Origin</th>
                            <th scope="col">Destination</th>
                            <th scope="col">$$$</th>
                            <th scope="col">Open Seats</th>
                            <th scope="col">View Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {journeys.map((journey, index) => {
                            return (
                                <tr key={index}>
                                    <td>{journey.origin}</td>
                                    <td>{journey.destination}</td>
                                    <td>{journey.contribution}</td>
                                    <td>{journey.openSeats}</td>
                                    <td><button className="btn btn-primary" onClick={() => history.push(`/journeys/show/${journey._id}`)}>Go</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default JourneyResults;