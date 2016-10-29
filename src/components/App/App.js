import React from 'react'
import Flex from 'flex-component'

import Titlebar from 'components/Titlebar'
import Categories from 'components/Categories'
import SearchInput from 'components/SearchInput'

import style from './App.scss'

const CATEGORIES = [
  { title: 'Movies', id: 'movie' },
  { title: 'Shows', id: 'show' },
  { title: 'Cartoons', id: 'cartoon' },
  { title: 'Anime', id: 'anime' },
]

export default class App extends React.Component {
  render () {
    const { categories, children, location: { pathname, state }, params: { searchTerm }} = this.props
    const isWatching = /watch/.test(pathname)
    const isSearching = /search/.test(pathname)

    return (
      <Flex className={isWatching ? style.containerVideoMode : style.container} direction='column'>
        {!isWatching && <Titlebar
          center={!isSearching && <Categories pathname={pathname} items={CATEGORIES} />}
          right={!isWatching && <SearchInput defaultValue={searchTerm} />}
        />}

        {children}
      </Flex>
    )
  }
}
