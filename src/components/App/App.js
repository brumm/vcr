import React from 'react'

import Titlebar from 'components/Titlebar'
import style from './App.scss'

export default React.createClass({
  render() {
    return <div className={style.container}>
      <Titlebar />
    </div>
  }
})
