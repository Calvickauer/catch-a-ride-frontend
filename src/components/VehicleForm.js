// Imports
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';



const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL

const {REACT_APP_API_KEY} = process.env



const Vehicle = (props) => {
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [seats, setSeats] = useState('');
    const [year, setYear] = useState('');
    const [results, setResults] = useState('');
    const [url, setUrl] = useState('');
    const [redirect, setRedirect] = useState(false);

    const user = props.user.id;
    const handleMake = (e) => {
        setMake(e.target.value);
    }

    const handleModel = (e) => {
        setModel(e.target.value);
    }

    const handleSeats = (e) => {
        setSeats(e.target.value);
    }

    const handleYear = (e) => {
        setYear(e.target.value);
    }

    
    
    //https://{cdn-instance}.imagin.studio/{api-name}?customer={customer-key}&{query parameters}
    // componentDidMount() {
    //     fetch("https://cdn.imagin.studio/getImage?&customer=usalejandromorenocompany&make=audi&modelFamily=a6&modelRange=a6&modelVariant=sa&modelYear=2014&powerTrain=petrol&transmission=0&bodySize=4&trim=0&paintId=pspc0004&angle=01")
    //         .then((res) => res.json())
    //         .then((json) => {
    //             this.setState({
    //                 items: json,
    //                 DataisLoaded: true
    //             });
    //         })
    // };

    // axios.get(`https://cdn.imagin.studio/getImage?&customer=${REACT_APP_API_KEY}&make=${make}&modelFamily=${model}&modelYear=${year}&trim=0&paintId=pspc0004&angle=01`)
    // .then(response =>{
    //   console.log('Vehicle API response', response.config.url);
    //   console.log(process.env)
    //   setResults(response.config.url);
    // })
    // .catch(error => console.log('ERROR', error));

    function handleTypeAhead(e){
        e.preventDefault()
        axios.get(`https://cdn.imagin.studio/getImage?&customer=${REACT_APP_API_KEY}&make=${make}&modelFamily=${model}&modelYear=${year}&trim=0&paintId=pspc0004&angle=01`)
        .then(response =>{
          console.log('Vehicle API response', response.config.url);
          console.log(process.env)
          setUrl(response.config.url);
        })
        .catch(error => console.log('ERROR', error));
    }

    function handleSubmit(e) {
    e.preventDefault()
    const newVehicle = {make, model, seats, year, user, url}
    axios.post(`${REACT_APP_SERVER_URL}/vehicles/new`, newVehicle)
    .then(response => {
        console.log('===> Yay, new vehicle');
        console.log(response);
        setRedirect(true);
    })
    .catch(error => console.log('===> Error in creating vehicle', error));
   }
   if (redirect) return <Redirect to="/profile"/>
    return (
        <div className="row mt-4">
        <div className="col-md-7 offset-md-3">
            <div className="card card-body vehicle-body">
                <h2 className="py-2">Add Vehicle</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Make</label>
                        <input type="text" name="make" value={make} onBlur={handleTypeAhead} onChange={handleMake} className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="model">Model</label>
                        <input type="text" name="model" value={model} onBlur={handleTypeAhead} onChange={handleModel} className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="seats">Seats</label>
                        <input type="number" name="seats" value={seats} onBlur={handleTypeAhead} onChange={handleSeats} className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="year">Year</label>
                        <input type="number" name="year" value={year} onBlur={handleTypeAhead} onChange={handleYear} className="form-control"/>
                    </div>
                    <button type="submit" className="btn btn-primary float-right">Submit</button>
                </form>
            </div>
            <div><img src={url} alt="" /></div>
        </div>
    </div>

    )
}

export default Vehicle;
