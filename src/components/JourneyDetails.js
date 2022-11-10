import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
// import MessageForm from './MessageForm';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;


const JourneyDetails = () => {
    const [journey, setJourney] = useState();
    const [passengerUids, setPassengerUids] = useState([])
    const { id } = useParams();
    const [redirect, setRedirect] = useState(false);

    console.log(id);

    useEffect(() => {
        const fetchJourney = async () => {
            setAuthToken(localStorage.getItem('jwtToken'));
            const result = await axios.get(`${REACT_APP_SERVER_URL}/journeys/show/${id}`);
            console.log(result.data);
            setJourney(result.data.journey);
            setPassengerUids(result.data.journey.passengerUids);
        };
        fetchJourney();
     }, []);

    const allPassengers = passengerUids.map((passenger,idx) => {
        console.log(passenger);
        return (
            <li key={idx}>{passenger.firstName} {passenger.lastName}</li>
        )
    })

     const navEdit = (e) => {
        setRedirect(true);
     }

    if (redirect) return <Redirect to={`/journeys/edit/${journey._id}`}/> // You can have them redirected to profile (your choice)


    if (journey) {
        return (
            <div className='journey-details'>
                <h3>Your journey from {journey.origin} to {journey.destination} on {journey.date}</h3>
                <p>Open Seats: {journey.openSeats}</p>
                <p>Desired Contribution: {journey.contribution}</p>
                <p>
                    <div>Passengers:</div>
                        <div>
                            <ul>
                                {allPassengers}
                            </ul>
                        </div>
                </p>
                <button onClick={navEdit}>Edit Details</button>
                {/* <MessageForm userId={id}/> */}
            </div>
        );
    } else {
        return (
            <h1>Loading...</h1>
        )
    }
}

export default JourneyDetails;