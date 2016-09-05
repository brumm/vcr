import React from 'react'
import Flex from 'flex-component'
import { withRouter } from 'react-router'

import BackLink from 'components/BackLink'
import style from './Titlebar.scss'

class Titlebar extends React.Component {

  search = ::this.search
  search({key, target: { value }}) {
    if (key === 'Enter') {
      this.props.router.push(`/search/${value}`)
    }
  }

  render() {
    const { floating, router, className, backLink, title } = this.props
    return (
      <Flex
        className={[floating ? style.ContainerFloating : style.Container, className].join(' ')}
        alignItems='center'
        justifyContent='center'
        shrink={0}
      >

        <Flex style={{overflow: 'visible'}} grow={1} basis={0} alignItems='center' justifyContent='flex-start'>
          {floating && <BackLink path={backLink} />}
          {!floating && [
            <div key={1} className={style.trafficLight} />,
            <div key={2} className={style.trafficLight} />,
            <div key={3} className={style.trafficLight} />,
          ]}
        </Flex>

        <Flex style={{overflow: 'visible'}} grow={1} basis={0} alignItems='center' justifyContent='center'>
          {title}
        </Flex>

        <Flex style={{overflow: 'visible'}} grow={1} basis={0} alignItems='center' justifyContent='flex-end'>
          {!floating && <input placeholder='Search' onKeyDown={this.search} className={style.search} type="search"/>}
        </Flex>


      </Flex>
    )
  }
}

export default withRouter(Titlebar)
