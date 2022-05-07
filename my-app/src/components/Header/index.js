import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { AuthContext } from '../../context/auth';

import FadeImage from '../FadeImage';

import style from './style.module.css';

const darkTitle = '/title_dark.png';
const lightTitle = '/title_light.png';

const Header = (props) => {
  const { light } = props;

  const authContext = useContext(AuthContext);

  const [expanded, setExpanded] = useState(false);

  const handleExpansion = () => {
    setExpanded(!expanded);
  }

  return (
    <div className={`${style.mainContainer} ${light && style.light}  ${expanded && style.expanded}`}>
      <div className={style.topContainer}>
        <FadeImage
          className={style.logo}
          src={ light ? lightTitle : darkTitle }
        />
        <button onClick={handleExpansion} />
      </div>
      <div className={style.navContainer}>
        <ul className={style.left}>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/about'>About</Link>
          </li>
        </ul>
        <ul className={style.right}>
          <li>
            <Link to='/search'>Search</Link>
          </li>
          <li>
            { authContext.loggedInGuide ?
            <Link to='/profile'>Profile</Link> :
            <Link to='/login'>Log In</Link> }
          </li>
        </ul>
      </div>
    </div>
  );
}

Header.propTypes = {
  light: PropTypes.bool
}

Header.defaultProps = {
	light: false
}

export default Header;

/*



<FadeImage
  className={style.logo}
  src={ light ? lightTitle : darkTitle }
/>
*/
