import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
// import DisplayPassengers from './DisplayPassengers';
// import JourneyDetails from './JourneyDetails';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const JourneyEdit = () => {
    const [journey, setJourney] = useState({
        origin: '',
        destination: '',
        contribution: '',
        openSeats: '',
        date: ''
    });
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
            setPassengerUids(result.data.journey.passengerUids)
        };
        fetchJourney();
        console.log(journey);
        console.log(passengerUids);
    }, []);

    const handleChange = (e) => {
        e.preventDefault();
        setJourney({ ...journey, [e.target.name]: e.target.value })
    };

    const handleSubmit = (e) => {
        const { origin, destination, contribution, openSeats, date } = journey;
        e.preventDefault();
        const editedJourney = {
            origin: origin,
            destination: destination,
            contribution: contribution,
            openSeats: openSeats,
            date: date
        }
        axios.put(`${REACT_APP_SERVER_URL}/journeys/edit/${id}`, editedJourney)
            .then(response => {
                setRedirect(true);
            })
            .catch(error => console.log('===> Error in Journey edit', error));
    };

    if (redirect) return <Redirect to={`/journeys/show/${id}`} /> 

    const removePassenger = (e) => {
        e.preventDefault();
        const pass = e.target.getAttribute('pId');
        console.log(pass);
        setPassengerUids(current => 
            current.filter(passengerUid => {
                return passengerUid._id !== pass;
            }))
        axios.delete(`${REACT_APP_SERVER_URL}/journeys/${id}/passengers/${pass}/remove`)
            .catch(error => console.log('===> Error in remove passengers', error));
    };

    const allPassengers = passengerUids.map((passenger,idx) => {
        console.log(passenger);
        return (
            <li className='passengers-font' key={idx}>{passenger.firstName} {passenger.lastName} <button pId={passenger._id} onClick={removePassenger}>Remove</button></li>
            // <li key={idx}>{passenger.firstName} {passenger.lastName} <button name='pId' value={passenger._id} onClick={removePassenger}>Remove</button></li>
        )
    })

    if (journey) {
        return (
            <div className="row mt-4">
                <div className="col-md-7 offset-md-3">
                    <div className="card card-body">
                        <h2 className="py-2">Edit Journey Details:</h2>
                        <form onSubmit={handleSubmit}>
                            <div className='form-group'>
                                <label htmlFor="date">Departure Date: </label>
                                <input type="date" value={journey.date} name='date' onChange={handleChange} required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="origin">Leaving From:</label>
                                <input type="text" name="origin" value={journey.origin} onChange={handleChange} placeholder={journey.origin} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="destination">Heading To:</label>
                                <input type="text" name="destination" value={journey.destination} onChange={handleChange} placeholder={journey.destination} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="contribution">$ Contribution:</label>
                                <input type="number" name="contribution" value={journey.contribution} onChange={handleChange} placeholder={journey.contribution} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="openSeats">Available Seats:</label>
                                <input type="number" name="openSeats" value={journey.openSeats} onChange={handleChange} placeholder={journey.openSeats} className="form-control" />
                            </div>
                            <button type="submit" className="btn btn-primary float-right">Submit</button>
                        </form>
                    </div>
                    <div>
                        <ul>
                            {allPassengers}
                        </ul>
                        {/* <DisplayPassengers passengers={passengerUids} setPassengers={setPassengerUids}/> */}
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <h1>Loading...</h1>
        )
    }
}

export default JourneyEdit;