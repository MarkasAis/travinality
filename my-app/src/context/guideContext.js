import React from 'react';

const initState = {
  cableApp: {},
  loggedInGuide: null,
  setLoggedInGuide: () => {},
  guide: null,
  getGuide: () => {},
  updateGuide: () => {},
  guides: [],
  getGuides: () => {}
};

const GuideContext = React.createContext(initState);

export { GuideContext };
