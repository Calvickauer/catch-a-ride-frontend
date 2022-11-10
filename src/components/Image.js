import React, { useState } from 'react';
import axios from 'axios';
const { REACT_APP_SERVER_URL } = process.env;

const Images = () => {

    // states
 const [state, setState] = useState({
    profileImg: ''
 })

 const handleSubmit = (e) => {
    const file = state.profileImg;
    console.log(file);
    const reader = new FileReader();
    reader.onloadend = () => {

        console.log('base64 encoding', reader.result);
        axios.post(`${REACT_APP_SERVER_URL}/images/new`, {file: reader.result})
    .then(res => {
        console.log(res);
    })
       
    };
    reader.readAsDataURL(file);


  
 } 

 const handleFileChange = (e) => {
    console.log(e.target.files)
    setState({ profileImg: e.target.files[0] })
 }

 return (
    <div className="container">
        <div className="row">
            <form id='profilePic' onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="file" onChange={handleFileChange} />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary" type="submit">Upload</button>
                </div>
            </form>
        </div>
    </div>
)

}


export default Images;