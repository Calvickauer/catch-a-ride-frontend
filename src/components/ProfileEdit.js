import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const ProfileEdit = (props) => {
    const { user, setUser } = props;
    const [redirect, setRedirect] = useState(false);

    const handleChange = (e) => {
        e.preventDefault();
        setUser({...user, [e.target.name]: e.target.value})
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { firstName, lastName } = user;
        const editedUser = {
            firstName: firstName,
            lastName: lastName
        }
        axios.put(`${REACT_APP_SERVER_URL}/users/edit`, editedUser)
            .then(response => {
                setRedirect(true);
            })
            .catch(error => console.log('===> Error in User edit', error));
    };

    if (redirect) return <Redirect to={`/profile`} />

    if (user) {
        return (
            <div className="row mt-4">
                <div className="col-md-7 offset-md-3">
                    <div className="card card-body">
                        <h2 className="py-2">Edit Profile:</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="firstName">Leaving From:</label>
                                <input type="text" name="firstName" value={user.firstName} onChange={handleChange} placeholder={user.firstName} className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Heading To:</label>
                                <input type="text" name="lastName" value={user.lastName} onChange={handleChange} placeholder={user.lastName} className="form-control"/>
                            </div>
                            <button type="submit" className="btn btn-primary float-right">Submit</button>
                        </form>
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

export default ProfileEdit;