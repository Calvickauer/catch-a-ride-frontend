// Imports
import React, { useState } from 'react';
import axios from 'axios';
import { Redirect, useParams } from 'react-router-dom';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;


const MessageForm = (props) => {
    const { id } = useParams();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [redirect, setRedirect] = useState(false);

    // setUser(props.user.token);

    const handleTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleContent = (e) => {
        setContent(e.target.value);
    }

    function handleSubmit() {
        const newMessage = { title, content }
        axios.post(`${REACT_APP_SERVER_URL}/messages/${id}/new`, newMessage)
            .then(response => {
                console.log('===> New Message');
                console.log(response);
                setRedirect(true);
            })
            .catch(error => console.log('===> Error in Messages', error));
    }
    if (redirect) return <Redirect to="/profile" />

    return (
        <div className="row mt-4">
            <div className="col-md-7 offset-md-3">
                <div className="card card-body login">
                    <h2 className="py-2">New Message</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Title:</label>
                            <input type="text" name="title" value={title} onChange={handleTitle} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="model">Message:</label>
                            <input type="text" name="content" value={content} onChange={handleContent} className="form-control" />
                        </div>
                        <button type="submit" className="btn btn-primary float-right">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default MessageForm;
