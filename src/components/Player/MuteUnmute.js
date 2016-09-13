import React from 'react'
import { withMediaProps } from 'react-media-player'
import VolumeIcon from 'react-icons/lib/fa/volume-up'
import MuteIcon from 'react-icons/lib/fa/volume-off'

import style from './Player.scss'

@withMediaProps
export default class MuteUnmute extends React.Component {
  shouldComponentUpdate({ media }) {
    return this.props.media.isMuted !== media.isMuted
  }

  handleMuteUnmute = () => {
    this.props.media.muteUnmute()
  }

  render() {
    const { media } = this.props
    return (
      <button
        type="button"
        className={style.ControlButton}
        onClick={this.handleMuteUnmute}
      >
        { media.isMuted ? <MuteIcon /> : <VolumeIcon /> }
      </button>
    )
  }
}
