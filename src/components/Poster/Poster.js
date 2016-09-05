import React from 'react'

import style from './Poster.scss'

const Poster = ({url, active, shrink}) => (
  <div className={active ? style.ContainerActive : style.Container}>
    <img src={url} referrerPolicy='no-referrer' className={style.Poster} />
  </div>
)

export default Poster
