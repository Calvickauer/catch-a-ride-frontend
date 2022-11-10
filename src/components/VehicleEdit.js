import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import ShowVehicle from './ShowVehicle';


const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;
const VehicleEdit = () => {
    const [vehicle, setVehicle] = useState({        
        make: '',
        model: '',
        year: '',
        seats: '',
        // date: ''
    });
    const [redirect, setRedirect] = useState(false);
    const { id } = useParams();

    console.log(id);

    useEffect(() => {
        const fetchVehicle = async () => {
            setAuthToken(localStorage.getItem('jwtToken'));
            const result = await axios.get(`${REACT_APP_SERVER_URL}/vehicles/vehicle/${id}`);
            console.log(result.data);
            setVehicle(result.data.vehicle);
        };
        fetchVehicle();
        console.log(vehicle);
     }, []);

    const handleChange = (e) => {
        e.preventDefault();
        setVehicle({...vehicle, [e.target.name]: e.target.value})
    };

    const handleSubmit = (e) => {
        const { make, model, year, seats } = vehicle;
        e.preventDefault(); 
        const editedVehicle = {
            make: make,
            model: model,
            year: year,
            seats: seats
            // date: date
        }
        axios.put(`${REACT_APP_SERVER_URL}/vehicles/edit/${id}`, editedVehicle)
            .then(response => {
                // history.push(`journeys/show/${id}`)
                console.log(response);
                setRedirect(true);
            })
            .catch(error => console.log('===> Error in Vehicle edit', error));
    };

    if (redirect) return <Redirect to={`/profile`} /> // You can have them redirected to profile (your choice)

    if (vehicle) {
        return (
            <div className="row mt-4">
                <div className="col-md-7 offset-md-3">
                    <div className="card card-body">
                        <h2 className="py-2">Edit Vehicle Details:</h2>
                        <form onSubmit={handleSubmit}>
                            <div className='form-group'>
                                <label htmlFor="make">Make: </label>
                                <input type="text" value={vehicle.make} name='make' onChange={handleChange} className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="model">Model:</label>
                                <input type="text" name="model" value={vehicle.model} onChange={handleChange} className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="year">Year:</label>
                                <input type="text" name="year" value={vehicle.year} onChange={handleChange} className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="seats">Seats:</label>
                                <input type="number" name="seats" value={vehicle.seats} onChange={handleChange} className="form-control"/>
                            </div>
                            <button type="submit" className="btn btn-primary float-right">Submit</button>
                        </form>
                    </div>
                    <div>
                        {/* <DisplayPassengers id = {id}/> */}
                        <img src={vehicle.url} alt=""/>
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

export default VehicleEdit