import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect, useHistory } from 'react-router-dom';
const { REACT_APP_SERVER_URL } = process.env;


const ImageContainer = (props) => {
    const[img, setImg] = useState('');

    useEffect(() => {
        axios.get(`${REACT_APP_SERVER_URL}/images/show/${props.photoId}`)
        .then(res => {
            setImg(Buffer.from(res.data.image, 'base64').toString('base64'));
        }).catch(err => {
            console.log(err);
        })
    }, []);

   
return (
    <div>
        <img src={`data:image/jpeg;base64,${img}`} />
    </div>
)
}


export default ImageContainer;