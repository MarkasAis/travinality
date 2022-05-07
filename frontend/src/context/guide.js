import React, { useState, useRef } from 'react';
import actionCable from 'actioncable'

import { GuideContext } from './guideContext';
import { areArraysEqualSets } from '../utils/algorithms';
import MyApi from '../api/myApi';
import LineWebSocket from '../api/lineWebSocket';
// import LoginHandler from '../components/LogInOut/loginHandler';

const CableApp = {
  cable: actionCable.createConsumer(`ws://${window.location.hostname}:3000/cable`)
};

const GuideProvider = ({ children }) => {
  const [loggedInGuide, setLoggedInGuide] = useState(null);
  const [guide, setGuide] = useState(null);
  const [guides, setGuides] = useState([]);
  const lastGuidesQuery = useRef({
    perPage: 0,
    pageNumber: 0,
    countries: []
  });
  const [error, setError] = useState(false);

  const updateLastGuidesQuery = (perPage, pageNumber, countries) => {
    lastGuidesQuery.current.perPage = perPage;
    lastGuidesQuery.current.pageNumber = pageNumber;
    lastGuidesQuery.current.countries = countries;
  }

  const getGuide = async (id) => {
    const _guide = await MyApi.requestGuide(id);
    setGuide(_guide);

    if (!_guide) setError(true);
  }

  const updateGuides = (update) => {
    // if (loggedInGuide && loggedInGuide.id === update.id && update.guide.active === false) {
    //   LoginHandler.handleLogout({
    //     loggedInGuide: loggedInGuide,
    //     setLoggedInGuide: setLoggedInGuide
    //   });
    //
    //   alert('You have been looged off due to inactivity.');
    // }

    if (guide && guide.id === update.id) {
      let updatedGuide = Object.assign({}, guide);
      updatedGuide = Object.assign(updatedGuide, update.guide);

      if (update.guide.currentLocation)
        updatedGuide.currentLocation = Object.assign(guide.currentLocation, update.guide.currentLocation);

      if (update.location) {
        if (!updatedGuide.previousLocations)
          updatedGuide.previousLocations = [];

        updatedGuide.previousLocations.unshift(update.location);
      }

      setGuide(updatedGuide);
    }
    if (guides) {
      const guideIndex = guides.findIndex(_guide => {
        return (_guide.id === update.id);
      });

      if (guideIndex !== -1) {
        const updatedGuides = [...guides];
        updatedGuides[guideIndex] = Object.assign({}, guides[guideIndex]);
        const updatedGuide = updatedGuides[guideIndex];

        Object.assign(updatedGuide, update.guide);

        if (update.guide.currentLocation)
          updatedGuide.currentLocation = Object.assign(guides[guideIndex].currentLocation, update.guide.currentLocation);

        setGuides(updatedGuides);
      }
    }
  }

  const isGuidesQueryRequired = (perPage, pageNumber, countries=[]) => {
    return (lastGuidesQuery.current.pageNumber !== pageNumber ||
            lastGuidesQuery.current.perPage < perPage ||
            !areArraysEqualSets(lastGuidesQuery.current.countries, countries));
  }

  const getGuides = async (perPage=10, pageNumber=1, countries, force=false) => {
    if (countries && !Array.isArray(countries))
      countries = [countries];

    if (isGuidesQueryRequired(perPage, pageNumber, countries) || force) {
      const guides = await MyApi.requestGuides(perPage, pageNumber, countries);
      setGuides(guides);

      updateLastGuidesQuery(perPage, pageNumber, countries || []);
    }
  }

  return (
    <GuideContext.Provider
        value={{
          cableApp: CableApp,
          loggedInGuide: loggedInGuide,
          setLoggedInGuide: setLoggedInGuide,
          guide: guide,
          getGuide: getGuide,
          updateGuides: updateGuides,
          guides: guides,
          getGuides: getGuides,
          error: error,
          setError: setError
        }}
      >
        <LineWebSocket />
        {children}
      </GuideContext.Provider>
  );
}

const GuideConsumer = GuideContext.Consumer;

export { GuideProvider, GuideConsumer};
