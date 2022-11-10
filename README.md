# Catch A Ride (United States)

Catch-A-Ride is an American online marketplace for carpooling. Our website connects drivers and passengers willing to travel together between cities at an agreed upon price.


# Catch A Ride Frontend

| Components | Links to Code | Description |
| --- | --- | --- |
| `App`| [`App`](https://github.com/calvickauer/catch-a-ride-frontend#app-component) | The component that manages the entire app |
| `Signup`| [`Signup`](https://github.com/calvickauer/catch-a-ride-frontend/blob/main/docs/signup.md) | Allow the user to signup |
| `Login`| [`Login`](https://github.com/calvickauer/catch-a-ride-frontend/blob/main/docs/login.md) | Allows the user to login to the app |
| `Navbar`| [`Navbar`](https://github.com/calvickauer/catch-a-ride-frontend/blob/main/docs/navbar.md) | Make `App` class component |
| `Profile`| [`Profile`](#) | A component that displays the user profile information |
| `setAuthToken`| [`setAuthToken`](https://github.com/romebell/catch-a-ride-frontend/blob/main/docs/setAuthToken.md) | A utility function that adds a token to the `Authentication` header to manage current user |
| `About`| [`About`](https://github.com/romebell/catch-a-ride-frontend/blob/main/docs/other-components.md#about) | A component that decribes the app |
| `Footer`| [`Footer`](https://github.com/romebell/catch-a-ride-frontend/blob/main/docs/other-components.md#footer) | A footer that goes on each component |
| `Welcome`| [`Welcome`](https://github.com/romebell/catch-a-ride-frontend/blob/main/docs/other-components.md#welcome) | A welcome page for the user |

### `App Component`

### Imports for `App`

```jsx
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
import VisitProfile from './components/VisitProfile';
import GoogleApiWrapper from './components/Welcome';
import Vehicle from './components/VehicleForm';
import JourneyOrRideForm from './components/JourneyOrRideReq';
import JourneyDetails from './components/JourneyDetails';
import Message from './components/MessageForm';
import VehicleEdit from './components/VehicleEdit';
import JourneyEdit from './components/JourneyEdit';
import Inbox from './components/Inbox';
import ProfileEdit from './components/ProfileEdit';
import Notfound from './components/404';
```

### `useState` inside `App.js`

```jsx
function App() {
  // Set state values
  const [currentUser, setCurrentUser] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(true);
}
```

### `useState` inside `Image.js`

```jsx
// State Values
 const [state, setState] = useState({
    profileImg: ''
 })
```

### `useState` inside `ImageContainer.js`

```jsx
const[img, setImg] = useState('');
    const[photoId, setPhotoId] = useState(props.photoId)
  ```

  ### `useState` inside `Inbox.js`

  ```jsx
  const [journeys, setJourneys] = useState([]);
  const [journeyId, setJourneyId] = useState([]);
  const [messages, setMessages] = useState([]);
  const [redirect, setRedirect] = useState(false);
  ```

  ### `useState` inside `JourneyDetails.js`

  ```jsx
    const [journey, setJourney] = useState();
    const { id } = useParams();
    const [redirect, setRedirect] = useState(false);

  
  ```

   ### `useState` inside `JourneyEdit.js`

  ```jsx
    const [journey, setJourney] = useState({
        origin: '',
        destination: '',
        contribution: '',
        openSeats: '',
        date: ''
    });
    const [passengerUids, setPassengerUids] = useState([])
    const { id } = useParams();
    const [redirect, setRedirect] = useState(false);

  
  ```

  ### `useState` inside `JourneyForm.js`

  ```jsx
    const [journey, setJourney] = useState({
        origin: '',
        destination: '',
        contribution: '',
        openSeats: '',
        date: ''
    });
    const [redirect, setRedirect] = useState(false);
    const [journeyId, setJourneyId] = useState('');

  
  ```

  ### `useState` inside `JourneyOrRideReq.js`

  ```jsx
  const [driver, setDriver] = useState(true);
  
  ```

  ### `useState` inside `Login.js`

  ```jsx
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
  ```

  ### `useState` inside `MessageForm.js`

  ```jsx
    
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [redirect, setRedirect] = useState(false);
  
  ```

  ### `useState` inside `Profile.js`

  ```jsx
   const [reviewsArr, setReviewsArr] = useState([]);
   const [profilePic, setProfilePic] = useState('');
  
  ```

  ### `useState` inside `ProfileEdit.js`

  ```jsx
    const { user, setUser } = props;
    const [redirect, setRedirect] = useState(false);
  
  ```

  ### `useState` inside `ProfilePic.js`

  ```jsx
    const[img, setImg] = useState('');
    const[photoId, setPhotoId] = useState(props.photoId)
  
  ```

  ### `useState` inside `ReviewsForm.js`

  ```jsx
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [id, setId] = useState('');

  
  ```


  ### `useState` inside `RideReqForm.js`

  ```jsx
    const [journey, setJourney] = useState({
        origin: '',
        destination: '',
        contribution: '',
        openSeats: '',
        date: ''
    });
    const [redirect, setRedirect] = useState(false);
    const [journeyId, setJourneyId] = useState('');
  
  ```


  ### `useState` inside `ShowVehicle.js`

  ```jsx
    const [results, setResults] = useState('');
  
  ```


  ### `useState` inside `Signup.js`

  ```jsx
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [redirect, setRedirect] = useState(false);
  
  ```


  ### `useState` inside `VehicleEdit.js`

  ```jsx
    const [vehicle, setVehicle] = useState({        
        make: '',
        model: '',
        year: '',
        seats: '',
        // date: ''
    });
    const [redirect, setRedirect] = useState(false);
  
  ```


  ### `useState` inside `VehiclesForm.js`

  ```jsx
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [seats, setSeats] = useState('');
    const [year, setYear] = useState('');
    const [results, setResults] = useState('');
    const [url, setUrl] = useState('');
    const [redirect, setRedirect] = useState(false);

  
  ```

  ### `useState` inside `Vehicles.js`

  ```jsx
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [seats, setSeats] = useState('');
    const [year, setYear] = useState('');
    const [results, setResults] = useState('');
    const [url, setUrl] = useState('');
    const [redirect, setRedirect] = useState(false);

  
  ```

  ### `useState` inside `VisitProfile.js`

  ```jsx
    const [ tuser, setTuser ] = useState({});
    const { idx } = useParams();
    const [reviewsArr, setReviewsArr] = useState([]);
    const [profilePic, setProfilePic] = useState([]);
  
  ```

  ### `useState` inside `Welcome.js`

  ```jsx
      this.state = {
      // for google map places autocomplete
      origin: '',
      destination: '',

      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
  
      mapCenter: {
        lat: 32.715738,
        lng: -117.1610838
      }
  ```