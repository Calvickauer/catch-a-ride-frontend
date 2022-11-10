import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Inbox = (props) => {
  const [journeys, setJourneys] = useState([]);
  const [journeyId, setJourneyId] = useState([]);
  const [messages, setMessages] = useState([]);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const fetchJourneys = async () => {
      setAuthToken(localStorage.getItem('jwtToken'));
      const result = await axios.get(`${REACT_APP_SERVER_URL}/messages/inbox`);
      console.log(result.data);
      setJourneys(result.data);
    };
    fetchJourneys();
  }, []);

  console.log(journeys);

  const acceptPassenger = (e) => {
    e.preventDefault();
    const jid = e.target.getAttribute('jid');
    const uid = e.target.getAttribute('uid');
    setJourneyId(jid);
    axios.post(`${REACT_APP_SERVER_URL}/journeys/${jid}/passenger/${uid}`)
      .then(response => {
        console.log(jid);
        console.log(uid);
        setRedirect(true);
      })
      .catch(error => console.log('===> Error accepting passenger', error));
  }

  if (redirect) return <Redirect to={`/journeys/show/${journeyId}`} /> 

  if (journeys) {
    return (
      <div>
      {journeys.map((journey, index) => {
        return (
          <div key={index}>
            <h2>From: {journey.origin} To: {journey.destination}</h2>

            {journey.messages.map((message, index) => {
              return (
                <div key={index}>
                  {console.log(message.user)}
                  <h4>Title: {message.title}</h4>
                  <p>Message: {message.content}</p>
                  <p>From: {message.user[0].firstName} {message.user[0].lastName}</p>
                  <button jid={journey._id} uid={message.user[0]} onClick={acceptPassenger}>Accept Passenger</button>
                </div>
              );
            })}
            <hr />
          </div>
        );
      })}
    </div>
    )
  }
}

export default Inbox;