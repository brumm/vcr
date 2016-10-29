import React from 'react'
import Image from 'legit-image'

import style from './Poster.scss'

const Poster = ({url, active, shrink, children}) => (
  <div className={active ? style.ContainerActive : style.Container}>
    {children}
    <Image src={url} referrerPolicy='no-referrer' className={style.Poster} />
  </div>
)

export default Poster
