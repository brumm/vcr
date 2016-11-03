import React from 'react'

class Image extends React.Component {

  defaultProps = {
    speed: 1
  }

  state = {
    opacity: 0
  }

  show = () => this.setState({ opacity: 1 })

  render(){
    let { style, ...otherProps } = this.props

    return (
      <img
        {...otherProps}
        style={{ ...style,
          transition: `opacity ${this.props.speed || 1}s`,
          opacity: this.state.opacity,
        }}
        onLoad={this.show}
        onError={this.show}
      />
    )
  }
}

import style from './Poster.scss'

const Poster = ({url, active, shrink, children}) => (
  <div className={active ? style.ContainerActive : style.Container}>
    {children}
    <Image src={url} referrerPolicy='no-referrer' className={style.Poster} />
  </div>
)

export default Poster
