import React from 'react'
import Flex from 'flex-component'
import { searchMovies } from 'utils/api'

import promised from 'utils/promised'
import FilmList from 'components/FilmList'

import style from './SearchPage.scss'

export default class SearchPage extends React.Component {

  @promised static loadProps = ({ searchTerm }) => (
    searchMovies(searchTerm).then(
      ({ films = [], more }) => ({ type: 'movie', films, more, searchTerm })
    )
  )

  render() {
    const { loading, children, films, more, filmType, searchTerm, params: { filmId } } = this.props

    return (films.length
      ? (
        <FilmList
          films={films}
          more={more}
          activeFilmId={filmId}
          basePath={`/search/${searchTerm}`}
        >{children}</FilmList>
      ) : (
        <Flex grow={1} alignItems='center' justifyContent='center'>
          <div className={style.noResults}>No Results found for "{searchTerm}"</div>
        </Flex>
      )
    )
  }
}
