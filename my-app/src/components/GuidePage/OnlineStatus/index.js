import React from 'react';

import style from './style.module.css';

const onlineColor = '#80f442';
const offlineColor = '#f45c41';

export default (props) => {
  const { online } = props;

  return (
    <div className={style.container}>
      <div style={{backgroundColor: online? onlineColor : offlineColor}} className={style.dot} />
      <p>{online ? 'Online' : 'Offline'}</p>
    </div>
  );
}
