import React from 'react';
import Gallery from 'react-grid-gallery';

import Header from '../Header'
import FeaturedGuides from '../FeaturedGuides'

import style from './style.module.css';

const IMAGES =
[{
        src: "gallery/1.png",
        thumbnail: "gallery/1.png",
        thumbnailWidth: 320,
        thumbnailHeight: 174,
        caption: "Fanes-Sennes-Prags Nature Park"
},
{
        src: "gallery/2.png",
        thumbnail: "gallery/2.png",
        thumbnailWidth: 420,
        thumbnailHeight: 212,
        caption: "Foggy landscape"
},
{
        src: "gallery/3.png",
        thumbnail: "gallery/3.png",
        thumbnailWidth: 420,
        thumbnailHeight: 212,
        caption: "Parque Nacional da Chapada dos Veadeiros"
},
{
        src: "gallery/4.png",
        thumbnail: "gallery/4.png",
        thumbnailWidth: 320,
        thumbnailHeight: 212,
        caption: "Cold sunset"
},
{
        src: "gallery/5.png",
        thumbnail: "gallery/5.png",
        thumbnailWidth: 400,
        thumbnailHeight: 212,
        caption: "Photography"
},
{
        src: "gallery/6.png",
        thumbnail: "gallery/6.png",
        thumbnailWidth: 250,
        thumbnailHeight: 212,
        caption: "Scuba diving"
},
{
        src: "gallery/7.png",
        thumbnail: "gallery/7.png",
        thumbnailWidth: 270,
        thumbnailHeight: 212,
        caption: "Waterfall"
},
{
        src: "gallery/8.png",
        thumbnail: "gallery/8.png",
        thumbnailWidth: 290,
        thumbnailHeight: 212,
        caption: "Warm sunset"
},
{
        src: "gallery/9.png",
        thumbnail: "gallery/9.png",
        thumbnailWidth: 320,
        thumbnailHeight: 212,
        caption: "Hot air ballon"
},
{
        src: "gallery/10.png",
        thumbnail: "gallery/10.png",
        thumbnailWidth: 320,
        thumbnailHeight: 212,
        caption: "Baku, Azerbaijan"
}];

const AboutPage = () => {
  return (
    <div className='fadeIn'>
      <Header light={false} />
      <div className={style.container}>
        <h1>About Us</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>

        <h1>Gallery</h1>
        <div className={style.gallery}>
          <Gallery tagStyle={style.gallery} images={IMAGES} enableImageSelection={false} />
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
