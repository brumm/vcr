import React from 'react'
import {
  default as Video,
  Controls, Play, Mute,
  Seek, Fullscreen, Time,
  Overlay
} from 'react-html5video'
import 'react-html5video/src/assets/video.css'

import Titlebar from 'components/Titlebar'
import style from './Player.scss'

const Player = ({ src, title, basePath, quality }) => {
  return (
    <Video className={style.Player} controls autoPlay>
      <source src={src} type="video/webm" />

      <Titlebar
        floating
        title={`${title} — ${quality}`}
        backLink={basePath}
        className='video-controls video__controls'
      />

      <Overlay />

      <Controls>
        <Play />
        <Seek />
        <Time />
        <Mute />
        <Fullscreen />
      </Controls>

    </Video>
  )
}

export default Player
