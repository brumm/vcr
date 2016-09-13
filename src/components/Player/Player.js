import React from 'react'
import debounce from 'lodash/debounce'

import {
  withMediaPlayer,
  withMediaProps,
  withKeyboardControls,
  controls
} from 'react-media-player'

import style from './Player.scss'

export { default as Volume } from './Volume'
export { default as PlayPause } from './PlayPause'
export { default as MuteUnmute } from './MuteUnmute'
export { default as Progress } from './Progress'

import Overlay from './Overlay'

@withMediaPlayer
@withMediaProps
@withKeyboardControls
export default class Player extends React.Component {

  state = {
    showOverlay: false
  }

  constructor(props) {
    super(props)

    this.hideOverlay = debounce(() => {
      this.setState({ showOverlay: false })
    }, 2000, { trailing: true })
  }

  shouldShowOverlay() {
    return !this.props.media.isPlaying || this.state.showOverlay
  }

  showOverlay() {
    this.setState({ showOverlay: true })
  }

  handleMousemove = ::this.handleMousemove
  handleMousemove() {
    if (this.state.showOverlay === false) {
      this.showOverlay()
    } else {
      this.hideOverlay()
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.props.keyboardControls)
    document.addEventListener('mousemove', this.handleMousemove)
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.props.keyboardControls)
    document.removeEventListener('mousemove', this.handleMousemove)
  }

  render() {
    const { Player, keyboardControls, media, children } = this.props
    return (
      <div className={style.Player}>
        {Player}

        <Overlay visible={this.shouldShowOverlay()}>
          {children(media)}
        </Overlay>
      </div>
    )
  }
}
