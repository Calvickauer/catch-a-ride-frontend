import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import MessageForm from './MessageForm';
import Messages from './Messages';
import Vehicles from './Vehicles';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import Images from './Image';
import ImageContainer from './ImageContainer';


const {REACT_APP_SERVER_URL} = process.env






const Profile = (props) => {
   const { handleLogout, user } = props;


   const { id, firstName, lastName, birthdate, email, exp} = user;
   const [reviewsArr, setReviewsArr] = useState([]);
   const [profilePic, setProfilePic] = useState([]);
   const expirationTime = new Date(exp * 1000);
   let currentTime = Date.now();

  useEffect(() => {
    setAuthToken(localStorage.getItem('jwtToken'));
    axios.get(`${REACT_APP_SERVER_URL}/users/profile`)
    .then(res => {
        console.log('RESPONSE', res.data);
        setReviewsArr(res.data.rev);
        // setProfilePic(res.data.user.photos[0]);
    }).catch(err => { console.log(err);
    });
  }, []);




   // make a condition that compares exp and current time
   if (currentTime >= expirationTime) {
       handleLogout();
       alert('Session has ended. Please login to continue.');
   }


    

   const userData = user ?
   (<div className='profile-card'>
       <h1>Profile</h1>
       <ImageContainer photoId={profilePic} />
       <Images />
       <p>Name: {firstName} {lastName}</p>
       <p>Email: {email}</p>
       <p>Birthday: {birthdate}</p>
       <p>ID: {id}</p>
       <div>

        { <MessageForm userId={id}/> }
        {/* { <Messages user={id} /> } */}
        <Vehicles user={id}/>


        <Messages arr={reviewsArr} />
        
        


       </div>
   </div>) : <h2>Loading...</h2>

    const errorDiv = () => {
        return (
            <div className="text-center pt-4">
                <h3>Please <Link to="/login">login</Link> to view this page</h3>
            </div>
        );
    };
    


    return (
        <div className="text-center pt-4">
            {user ? userData : errorDiv()}
        </div>
    );

}


export default Profile;