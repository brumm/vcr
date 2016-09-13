import React from 'react'
import style from './Player.scss'

const Overlay = ({ visible, children }) => (
  <div className={visible ? style.OverlayVisible : style.Overlay}>
    {children}
  </div>
)

export default Overlay
