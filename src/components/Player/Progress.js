import React from 'react'
import { withMediaProps } from 'react-media-player'
import style from './Player.scss'

@withMediaProps
export default class Progress extends React.Component {
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
