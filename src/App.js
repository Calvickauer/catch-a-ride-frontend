// Imports
import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';

// CSS
import './App.css';

// Components
import Signup from './components/Signup';
import About from './components/About';
import Footer from './components/Footer';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Welcome from './components/Welcome';
import Vehicle from './components/VehicleForm';
import JourneyForm from './components/JourneyForm';
import JourneyDetails from './components/JourneyDetails';
import Message from './components/MessageForm';
//import AllMessages from './components/AllMessages';
import JourneyEdit from './components/JourneyEdit';
// import AllMessages from './components/AllMessages';

const PrivateRoute = ({ component: Component, ...rest}) => {
  let token = localStorage.getItem('jwtToken');
  console.log('===> Hitting a Private Route');
  return <Route {...rest} render={(props) => {
    return token ? <Component {...rest} {...props} /> : <Redirect to="/login"/>
  }} />
}

function App() {
  // Set state values
  const [currentUser, setCurrentUser] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(true);

 
  useEffect(() => {
    let token;

    if (!localStorage.getItem('jwtToken')) {
      setIsAuthenticated(false);
      console.log('====> Authenticated is now FALSE');
    } else {
      token = jwt_decode(localStorage.getItem('jwtToken'));
      setAuthToken(localStorage.getItem('jwtToken'));
      setCurrentUser(token);
    }
  }, []);

  const nowCurrentUser = (userData) => {
    console.log('===> nowCurrent is here.');
    setCurrentUser(userData);
    setIsAuthenticated(true);
  }

  const handleLogout = () => {
    if (localStorage.getItem('jwtToken')) {
      // remove token for localStorage
      localStorage.removeItem('jwtToken');
      setCurrentUser(null);
      setIsAuthenticated(false);
    }
  }

  return (
    <Router>
    <div className="App">
      <Navbar handleLogout={handleLogout} isAuth={isAuthenticated} />
      <div className="container mt-5">
        <Switch>
          <Route path='/signup' component={Signup} />
          <Route 
            path="/login"
            render={(props) => <Login {...props} nowCurrentUser={nowCurrentUser} setIsAuthenticated={setIsAuthenticated} user={currentUser}/>}
          />
          <PrivateRoute path="/profile" component={Profile} user={currentUser} handleLogout={handleLogout} />
          <PrivateRoute path="/vehicle" component={Vehicle} user={currentUser}  />
          <PrivateRoute path="/journeys/new" component={JourneyForm} user={currentUser}  />
          <PrivateRoute path="/journeys/:id" component={JourneyDetails} user={currentUser}  />
          <PrivateRoute path="/journeys/edit/:id" component={JourneyEdit} user={currentUser}  />
          <PrivateRoute path="/messages/new" component={Message} user={currentUser}  />
          {/* <Route exact path="/messages" component={AllMessages} user={currentUser} /> */}
          <Route exact path="/" component={Welcome} />
          <Route path="/about" component={About} />
        </Switch>
      </div>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
