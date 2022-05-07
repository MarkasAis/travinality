import React, { useState, useEffect, useContext } from 'react';

import ReactLoading from 'react-loading';
import { GuideContext } from '../../context';

import HexGrid from '../HexGrid';
import ButtonLink from '../ButtonLink';

import style from './style.module.css';

const FeaturedGuides = () => {
  const context = useContext(GuideContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGuides();
  }, []);

  const loadGuides = async () => {
    setLoading(true);
    await context.getGuides(6);
    setLoading(false);
  }

  const generateNodes = () => {
    return context.guides.slice(0, 9).map(guide => (
      {
        topText: guide.name,
        bottomText: guide.currentLocation && guide.currentLocation.name,
        image: guide.picture,
        link: `/guide/${guide.id}`
      }
    ));
  };

  return (
    <div className={style.container}>
      <h1 className={style.title}>Featured Guides</h1>

      {loading ?
        <ReactLoading className={`${style.loader} fade-in`} type='spinningBubbles' color='black' height={75} width={75} /> :
        <HexGrid nodes={generateNodes()} />
      }

      <ButtonLink className={style.seeAll} to='/search'>See all guides</ButtonLink>
    </div>
  );
}

export default FeaturedGuides;
