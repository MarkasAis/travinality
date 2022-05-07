import React, { useState, useEffect } from 'react';
import MyApi from '../api/myApi';

const TRACKER_OPTIONS = {
  enableHighAccuracy: false,
  timeout: 5000,
  maximumAge: 0
}

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [loggedInGuide, setLoggedInGuide] = useState(null);

  let trackerId = null;

  // Runs once at the start, and retrieves guide data if the user is already logged in
  useEffect(() => {
    requestLoggedInGuideData();
  }, []);

  // Invokes a geolocation tracker which calls the updateGuidePosition function when it senses a change in location
  const attachPositionTracker = (guide) => {
    if (navigator.geolocation) {
      trackerId = navigator.geolocation.watchPosition((position) => { console.log(position)
        MyApi.updateGuidePosition(position.coords, guide.currentLocation);
      }, null, TRACKER_OPTIONS);
    }
  }

  // Destroys the geolocation tracker
  const removePositionTracker = () => {
    if (trackerId != null) {
      navigator.geolocation.clearWatch(trackerId);
      trackerId = null;
    }
  }

  // Sends a login request to the server and retrieves profile data of the signed in guide
  const login = async (email, password)  => {
    await MyApi.login(email, password);
    requestLoggedInGuideData();
  }

  // Retrieves profile data of the signed in guide
  const requestLoggedInGuideData = async () => {
    const guide = await MyApi.requestLoggedInGuide();
    setLoggedInGuide(guide);
    attachPositionTracker(guide);
  }

  // Sends a log out request, destroys the geolocation tracker, and destroys the guide object
  const logout = async () => {
    MyApi.logout();
    removePositionTracker();
    setLoggedInGuide(null);
  }

  // Return a context provider component, that exposes LOGIN, LOGOUT, and LOGGED IN GUIDE
  // functionality to the rest of the application
  return (
    <AuthContext.Provider
        value={{
          login: login,
          loggedInGuide: loggedInGuide,
          logout: logout
        }}
      >
        {children}
      </AuthContext.Provider>
  );
}

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer, AuthContext }
