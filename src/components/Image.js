import React, { useState } from 'react';
import axios from 'axios';

const Images = () => {

    // states
 const [onFileChange, setOnFileChange] = useState('');
 const [onSubmit, setOnSubmit] = useState('');
 const [state, setState] = useState({
    profileImg: ''
 })

 const handleSubmit = (e) => {
    e.target.preventDefault();
    const formData = new FormData()
    formData.append('profileImg', state.profileImg)
    axios.post("http://localhost:3000/api/images/new", formData, {
    }).then(res => {
        console.log(res)
    })

       
    };
    reader.readAsDataURL(file);


  

 } 

 const handleFileChange = (e) => {
    setState({ profileImg: e.target.files[0] })
 }

 return (
    <div className="container">
        <div className="row">
            <form onSubmit={handleSubmit}>
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