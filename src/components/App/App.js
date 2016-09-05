import React from 'react'
import Flex from 'flex-component'
import { Link } from 'react-router'

import Titlebar from 'components/Titlebar'

import { highlightColor, darkerHighlightColor } from 'variables.scss'
import style from './App.scss'

const TYPES = [
  { title: 'Movies', id: 'movie' },
  { title: 'Shows', id: 'show' },
  { title: 'Cartoons', id: 'cartoon' },
  { title: 'Anime', id: 'anime' },
]

export default class App extends React.Component {

  render () {
    const { categories, children, location: { pathname, state }} = this.props
    const isWatching = /watch/.test(pathname)

    return (
      <Flex className={isWatching ? style.containerVideoMode : style.container} direction='column'>
        {!isWatching && <Titlebar title={
          TYPES.map(type => (
            <Link
              to={`/browse/${type.id}`}
              key={type.id}
              style={{ margin: '0 10px', color: darkerHighlightColor }}
              activeStyle={{ color: highlightColor }}
            >{type.title}</Link>
          ))
        } />}

        {children}
      </Flex>
    )
  }
}
