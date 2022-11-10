import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Buffer} from 'buffer';
import { Redirect, useHistory } from 'react-router-dom';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;


const ImageContainer = (props) => {
    const[img, setImg] = useState('');
    const[photoId, setPhotoId] = useState(props.photoId)
    console.log('photos ID before', props.photoId)
useEffect(() => {
    console.log('photos ID', props.photoId)
    console.log(localStorage.getItem('photoId'))
    axios.get(`${REACT_APP_SERVER_URL}/images/show/${localStorage.getItem('photoId')}`)
        .then(res => {

            console.log('RES>DATA', res.data);

            setImg(Buffer.from(res.data.image, 'base64').toString('base64'));
        }).catch(err => {
            console.log(err);
        })
    }, []);

   
return (
    <div>
        <img src={`data:image/jpeg;base64,${img}`} className='image-container'/>
    </div>
)
}


export default ImageContainer;