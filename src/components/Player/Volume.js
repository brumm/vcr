import React from 'react'
import { withMediaProps } from 'react-media-player'

import style from './Player.scss'

@withMediaProps
export default class Volume extends React.Component {
  onChangeUsed = false

  shouldComponentUpdate({ media }) {
    return this.props.media.volume !== media.volume
  }

  handleChange = ({ target: { value } }) => {
    this.props.media.setVolume((+value).toFixed(4))
    this.onChangeUsed = true
  }

  render() {
    const { media: { volume }} = this.props
    return (
      <input
        type="range"
        step="any"
        min={0}
        max={1}
        value={volume}
        onChange={this.handleChange}
        className={style.Volume}
      />
    )
  }
}
