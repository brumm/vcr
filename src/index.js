import 'css/global'
import React from 'react'
import { render } from 'react-dom'
import Flex from 'flex-component'

import { Router, Route, IndexRoute, IndexRedirect, Redirect, hashHistory } from 'react-router'
import AsyncProps from 'async-props'

import page from 'utils/page'

import App    from 'components/App'
import BrowsePage from 'components/BrowsePage'
import SearchPage from 'components/SearchPage'
import WatchPage from 'components/WatchPage'
import FilmDetail  from 'components/FilmDetail'

hashHistory.listen(({ pathname }) => console.info('[location]', pathname))

render(
  <Router history={hashHistory} render={props => <AsyncProps {...props} renderLoading={() => (
    <div className="video-spinner">
      <div className="video-spinner__rect1"></div>
      <div className="video-spinner__rect2"></div>
      <div className="video-spinner__rect3"></div>
      <div className="video-spinner__rect4"></div>
      <div className="video-spinner__rect5"></div>
    </div>
  )} />}>
    <Route path="/" component={App}>

      <IndexRedirect to="/browse/movie" />

      <Route path="/search/:searchTerm" component={SearchPage}>
        <Route path=":filmId" component={FilmDetail} />
      </Route>

      <Route path="/browse/:filmType" component={BrowsePage}>
        <Route path=":filmId" component={FilmDetail} />
      </Route>

      <Route path="/watch/:chapterId(/:sourceIndex)" component={WatchPage} />

    </Route>

    <Redirect from="*" to="/" />
  </Router>,
  document.querySelector('#app')
)
