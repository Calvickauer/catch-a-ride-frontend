import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReviewsForm from './ReviewsForm';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import Messages from './Messages';
import ProfilePic from './ProfilePics';

import { Redirect, useParams } from 'react-router-dom';

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;



const VisitProfile = () => {
    const [ tuser, setTuser ] = useState({});
    const { idx } = useParams();
    const [reviewsArr, setReviewsArr] = useState([]);
    console.log('BIG CAPS HERE', idx);
    

    useEffect(() => {
        setAuthToken(localStorage.getItem('jwtToken'));
        axios.get(`${REACT_APP_SERVER_URL}/users/profile/go/${idx}`)
            .then(res => {
                console.log('THE USER', res.data);
                setTuser(res.data);
                setReviewsArr(res.data.rev);
                const reversed = res.data.photos.reverse();

                localStorage.setItem('pictureId', reversed[0]);
                console.log('TUSER CONSOLE LOG', tuser)
            }).catch(err => {
                console.log(err);
            });
    }, [])


    const { id, firstName, lastName, birthdate, email, rev, photos } = tuser;
    
    // const expirationTime = new Date(exp * 1000);
    let currentTime = Date.now();



    return (

        <div>
        <h1>Profile</h1>
            <ProfilePic  />
            <p>Name: {firstName} {lastName}</p>
            <p>Email: {email}</p>
            <p>Birthday: {birthdate}</p>
            <p>ID: {id}</p>
            <ReviewsForm userId={id}/>
             <Messages arr={reviewsArr} />
            <div></div>
            </div>

        
    );

}

export default VisitProfile;