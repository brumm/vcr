import React from 'react'
import Flex from 'flex-component'
import { searchMovies } from 'utils/api'

import promised from 'utils/promised'

import FilmList from 'components/FilmList'

export default class SearchPage extends React.Component {

  @promised static loadProps = ({ searchTerm }) => (
    searchMovies(searchTerm).then(
      ({ films, more }) => ({ type: 'movie', films, more, searchTerm })
    )
  )

  render() {
    const { loading, children, films, more, filmType, searchTerm, params: { filmId } } = this.props

    return (
      <FilmList
        films={films}
        more={more}
        activeFilmId={filmId}
        basePath={`/search/${searchTerm}`}
      >
        {children}
      </FilmList>
    )
  }
}
