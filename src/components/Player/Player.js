import React from 'react'
import PlayIcon from 'react-icons/lib/fa/play'
import PauseIcon from 'react-icons/lib/fa/pause'

import { withMediaPlayer, withMediaProps, withKeyboardControls, controls } from 'react-media-player'
import style from './Player.scss'

@withMediaProps
export class PlayPause extends React.Component {
  shouldComponentUpdate({ media }) {
    return this.props.media.isPlaying !== media.isPlaying
  }

  handlePlayPause() {
    this.props.media.playPause()
  }

  render() {
    const { media } = this.props
    return (
      <button
        type="button"
        className={style.PlayPause}
        onClick={::this.handlePlayPause}
      >
        { media.isPlaying ? <PauseIcon/> : <PlayIcon/> }
      </button>
    )
  }
}

@withMediaProps
export class Progress extends React.Component {
  shouldComponentUpdate({ media }) {
    return this.props.media.currentTime !== media.currentTime
  }

  handleSeek({ clientX, target: { offsetLeft, clientWidth }}) {
    let fraction = (clientX - offsetLeft) / clientWidth
    this.props.media.seekTo(
      this.props.media.duration * fraction
    )
  }

  render() {
    const { media } = this.props
    return (
      <progress
        onClick={::this.handleSeek}
        className={style.Progress}
        max={100}
        value={media.currentTime * 100 / media.duration}
      />
    )
  }
}

export const Overlay = ({ visible, children }) => (
  <div className={visible ? style.OverlayVisible : style.Overlay}>
    {children}
  </div>
)

@withMediaPlayer
@withMediaProps
@withKeyboardControls
export class Player extends React.Component {

  componentDidMount() {
    document.addEventListener('keydown', this.props.keyboardControls)
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.props.keyboardControls)
  }

  render() {
    const { Player, keyboardControls, media, children } = this.props
    return (
      <div className={style.Player}>
        {Player}
        {children(media)}
      </div>
    )
  }
}
