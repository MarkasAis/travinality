import React, { useState, useRef, useContext } from 'react';

import countryList from 'react-select-country-list';
import { GuideContext } from '../../context';

import Select from 'react-select';
import ReactLoading from 'react-loading';
import Header from '../Header';
import FadeImage from '../FadeImage';
import HexGrid from '../HexGrid';

import style from './style.module.css';

const GuideSearchPage = () => {
  const context = useContext(GuideContext);

  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const searchCountry = useRef(null);

  const searchGuides = async () => {
    if (!searchCountry.current)
      return;

    setLoading(true);
    setSearched(true);

    await context.getGuides(20, 1, searchCountry.current);
    setLoading(false);
  }

  const handleSelect = (option) => {
    searchCountry.current = option.label;
  };

  const generateNodes = () => {
    return context.guides.map(guide => (
      {
        topText: guide.name,
        bottomText: guide.currentLocation.name,
        image: guide.picture,
        link: `/guide/${guide.id}`
      }
    ));
  };

  return (
    <div className='fadeIn'>
      <Header light={true} />
      <div className={`${style.mainContainer} ${searched && style.searched}`}>
        <div className={style.searchContainer}>
          <FadeImage className={style.background} src={'/search_bg.jpg'} />
          <p>Search guides by country</p>
          <div>
            <Select
              className={style.selectBox}
              placeholder={'Select country...'}
              options={countryList().getData()}
              onChange={handleSelect}
            />
            <button className={'button1'} onClick={() => {searchGuides()}}>Search</button>
          </div>
        </div>
        <div className={style.resultsContainer}>
          {(loading || !searched) ?
            <ReactLoading
              className={`${style.loader} fade-in`}
              type='spinningBubbles'
              color='black'
              height={75}
              width={75}
            />
          :
            <>
              {context.guides.length ?
              <HexGrid nodes={generateNodes()} /> :
              <p>No results found. Try selecting another location.</p>}
            </>
          }
        </div>
      </div>
    </div>
  );
}

export default GuideSearchPage;
