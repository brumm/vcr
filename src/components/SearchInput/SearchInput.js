import React from 'react'
import { withRouter } from 'react-router'

import style from './SearchInput.scss'

class SearchInput extends React.Component {

  componentDidMount() {
    this.refs.search.addEventListener('search', this.onSearch)
  }
  componentWillUnmount() {
    this.refs.search.addEventListener('search', this.onSearch)
  }

  onSearch = ::this.onSearch
  onSearch({target: { value }}) {
    if (value.length === 0) {
      this.props.router.push(`/`)
    } else {
      this.props.router.push(`/search/${value}`)
    }
  }

  render() {
    return (
      <input
        ref='search'
        defaultValue={this.props.defaultValue}
        placeholder='Search'
        className={this.props.defaultValue ? style.searchNonEmpty : style.search}
        type="search"
      />
    )
  }
}

export default withRouter(SearchInput)
