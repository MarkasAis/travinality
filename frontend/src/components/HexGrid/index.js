import React from 'react';
import PropTypes from 'prop-types';

import Hex from '../Hex'

import style from './style.module.css'

const HexGrid = (props) => {
  const { nodes } = props;

  return (
    <ul className={style.container}>
      {nodes.map((node, index) => (
        <li className={style.hex} key={index}>
          <Hex
            overlay={true}
            topText={node.topText}
            bottomText={node.bottomText}
            image={node.image}
            link={node.link}
            onClick={node.onClick}
          />
        </li>
      ))}
    </ul>
  );
}

Hex.propTypes = {
  nodes: PropTypes.array
}

export default HexGrid;
