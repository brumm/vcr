import React from 'react'
import PlayIcon from 'react-icons/lib/fa/play'
import PauseIcon from 'react-icons/lib/fa/pause'
import debounce from 'lodash/debounce'

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
