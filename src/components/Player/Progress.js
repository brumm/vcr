import React from 'react'
import { withMediaProps } from 'react-media-player'
import Flex from 'flex-component'

import style from './Player.scss'

@withMediaProps
export default class Progress extends React.Component {
  shouldComponentUpdate({ media }) {
    return this.props.media.currentTime !== media.currentTime
  }

  handleSeek({ clientX, target }) {
    const { clientWidth } = target
    const { left } = target.getBoundingClientRect()
    let fraction = (clientX - left) / clientWidth

    this.props.media.seekTo(
      this.props.media.duration * fraction
    )
  }

  render() {
    const { media } = this.props
    return (
      <Flex grow={1} onClick={::this.handleSeek} className={style.ProgressContainer} alignItems='center'>
        <Flex grow={1} className={style.Progress}>
          <progress
            className={style.ProgressPlayed}
            max={100}
            value={media.currentTime * 100 / media.duration}
          />

          <progress
            className={style.ProgressLoaded}
            style={style}
            max={100}
            value={media.progress * 100}
          />
        </Flex>
    </Flex>
    )
  }
}
