import React from 'react'
import Flex from 'flex-component'

import style from './Titlebar.scss'

import { remote } from 'electron'

class Titlebar extends React.Component {

  render() {
    const { floating, className, left, center, right } = this.props
    return (
      <Flex
        className={[floating ? style.ContainerFloating : style.Container, className].join(' ')}
        alignItems='center'
        justifyContent='center'
        shrink={0}
      >

        <Flex style={{overflow: 'visible'}} grow={1} basis={0} alignItems='center' justifyContent='flex-start'>
          {[
            <div key={1} className={style.trafficLight} onClick={() => remote.app.quit()} />,
            <div key={2} className={style.trafficLight} onClick={() => remote.getCurrentWindow().minimize()} />,
            <div key={3} className={style.trafficLight} onClick={() => remote.getCurrentWindow().setFullScreen(!remote.getCurrentWindow().isFullScreen())} />,
          ]}

          <div style={{ marginLeft: 10 }}>{left}</div>
        </Flex>

        <Flex style={{overflow: 'visible'}} grow={2} basis={0} alignItems='center' justifyContent='center'>
          {center}
        </Flex>

        <Flex style={{overflow: 'visible'}} grow={1} basis={0} alignItems='center' justifyContent='flex-end'>
          {right}
        </Flex>


      </Flex>
    )
  }
}

export default Titlebar
