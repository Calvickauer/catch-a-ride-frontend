// Imports
import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import setAuthToken from '../utils/setAuthToken';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const JourneyForm = () => {
    const [journey, setJourney] = useState({
        origin: '',
        destination: '',
        contribution: '',
        openSeats: '',
        date: ''
    });
    const [redirect, setRedirect] = useState(false);
    const [journeyId, setJourneyId] = useState('');

    const handleChange = (e) => {
        setJourney({...journey, [e.target.name]: e.target.value})
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 
        const newJourney = journey;
        console.log(newJourney);
        setAuthToken(localStorage.getItem('jwtToken'));
        axios.post(`${REACT_APP_SERVER_URL}/journeys/new`, newJourney)
            .then(response => {
                console.log('===> Yay, new journey');
                console.log(response.data);
                setJourneyId(response.data._id);
                setRedirect(true);
            })
            .catch(error => console.log('===> Error in Journey creation', error));
    };

    if (redirect) return <Redirect to={`/journeys/show/${journeyId}`} /> // You can have them redirected to profile (your choice)

    return (
        <div className="row mt-4 journey-size">
            <div className="col-md-7 offset-md-3">
                <div className="card card-body journey-body">
                    <h2 className="py-2">Post a New Journey!</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label htmlFor="date">Departure Date: </label>
                            <br/>
                            <input type="date" value={journey.date} name='date' onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="origin">Leaving From:</label>
                            <input type="text" name="origin" value={journey.origin} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="destination">Heading To:</label>
                            <input type="text" name="destination" value={journey.destination} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contribution">$ Contribution:</label>
                            <input type="number" name="contribution" value={journey.contribution} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="openSeats">Available Seats:</label>
                            <input type="number" name="openSeats" value={journey.openSeats} onChange={handleChange} className="form-control" />
                        </div>
                        <button type="submit" className="btn btn-primary float-right">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default JourneyForm;