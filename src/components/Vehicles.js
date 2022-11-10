import React, { useState, useEffect } from 'react';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import ShowVehicle from './ShowVehicle';
import '../css/Vehicle.css'
import { Link, Redirect, useHistory } from 'react-router-dom';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;
const { REACT_APP_API_KEY } = process.env;

    

function Vehicles(props) { 
    const [vehicle, setVehicle] = useState([]);
    const [results, setResults] = useState('');
    const [redirect, setRedirect] = useState(false);
    // setVehicle(props.user.vehicle);
    
    // useEffect(() => {
    //     axios.get(`${REACT_APP_SERVER_URL}/vehicles/vehicle/635d9cba511ddd6650a0a635`)
    //     .then(vehicles => {
    //         if (vehicles.data) {
    //             setVehicle(vehicles.data);
    //         }else {
    //             setVehicle('error');
    //         }
            
    //     })
    // }, [])

    

    ////////////////// YOUR GOING TO HAVE TO MAKE A NEW COMPONENT FOR
    // useEffect(() => {
        // axios.get(`https://cdn.imagin.studio/getImage?&customer=${REACT_APP_API_KEY}&make=${v.make}&modelFamily=${v.model}&modelYear=&trim=0&paintId=pspc0004&angle=01`)
        // .then(response =>{
        // //   setResults(response.config.url);
        // setResults(response.config.url);
        // console.log(response.config.url);
        // })
        // .catch(error => console.log('ERROR', error));
    // }, [])
   

    useEffect(() => {
        setAuthToken(localStorage.getItem('jwtToken'));
        axios.get(`${REACT_APP_SERVER_URL}/users/profile`)
        .then(res => {
            console.log(res.data);
            setVehicle(res.data.vehicle);
            // if (vehicles) {
            //     // setVehicle(vehicles.data);
            //     setVehicle( arr => [...arr, `${vehicles.data.vehicle}`]);
            //     console.log(vehicles.data)

            // }else {
            //     setVehicle('erroR');
            // }
            
        })
    }, [])
    

     let history = useHistory();
    const handleClick = (id) => {
        // 👇️ navigate to /contacts
        console.log('redirect')
        history.push(`vehicles/edit/${id}`)
        };
    
    // console.log('Vehicle variable is this:', vehicle)
    // console.log(vehicle[0])
    console.log(vehicle);
    
    const removeVehicle = (e) => {
        e.preventDefault();
        const pass = e.target.getAttribute('vId');
        console.log(pass);
        setVehicle(current => 
            current.filter(vehicleId => {
                return vehicleId._id !== pass;
            }))
        axios.delete(`${REACT_APP_SERVER_URL}/vehicles/${pass}/remove`)
            .catch(error => console.log('===> Error in remove passengers', error));
        window.location.reload(false);
    };

    
    

    const vehicleBoard = vehicle.map((v, idx) => {
        // if (redirect) return <Redirect to={`/vehicles/edit/${v._id}`}/>
        return (
            
            <div key={idx}>
                <h2>
                    {/* The make goes below this */}
                    {v.make}
                </h2>
                <p>
                    {/* the model goes below this */}
                    {v.model}
                </p>
                {/* <p>
                    {v._id}
                </p> */}
                <div className='side-by-side'>
                    <ShowVehicle vehicle={v}/>
                    <button type='button' id='edit-vehicle-button' className='glow-on-hover' onClick={() => handleClick(v._id)}>Edit Vehicle</button>
                    <button type='button' vId={v._id} id='edit-vehicle-button' className='glow-on-hover' onClick={removeVehicle}>Delete</button>
                </div>
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>
        )
    })
    return (
        <div>
            {/* {vehicle[0].make} */}
            {/* {vehicleBoard2} */}
            <div>
                My Vehicles:
            </div>
            {vehicleBoard}
        </div>
        
    ) 
}


export default Vehicles;