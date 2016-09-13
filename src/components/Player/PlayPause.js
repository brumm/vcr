import React from 'react'
import { withMediaProps } from 'react-media-player'
import PlayIcon from 'react-icons/lib/fa/play'
import PauseIcon from 'react-icons/lib/fa/pause'

import style from './Player.scss'

@withMediaProps
export default class PlayPause extends React.Component {
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
        className={style.ControlButton}
        onClick={::this.handlePlayPause}
      >
        { media.isPlaying ? <PauseIcon/> : <PlayIcon/> }
      </button>
    )
  }
}
