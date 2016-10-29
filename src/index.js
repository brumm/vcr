import 'css/global'
import React from 'react'
import { render } from 'react-dom'
import Flex from 'flex-component'
import { Provider } from 'mobx-react'
import { Router, Route, IndexRoute, IndexRedirect, Redirect, hashHistory } from 'react-router'
import AsyncProps from 'components/AsyncProps'

import appState from './appState'
import page from 'utils/page'

import App        from 'components/App'
import BrowsePage from 'components/BrowsePage'
import SearchPage from 'components/SearchPage'
import WatchPage  from 'components/WatchPage'
import FilmDetail from 'components/FilmDetail'
import Loader     from 'components/Loader'

hashHistory.listen(({ pathname }) => console.info('[location]', pathname))

const renderLoading = () => (
  <Flex
    style={{position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh'}}
    alignItems='center'
    justifyContent='center'
  >
    <Loader />
  </Flex>
)

render(
  <Provider appState={appState}>
    <Router history={hashHistory} render={props => <AsyncProps {...props} renderLoading={renderLoading} />}>
      <Route path="/" component={App}>

        <IndexRedirect to="/browse/movie/popular" />

        <Route path="/search/:searchTerm" component={SearchPage}>
          <Route path=":filmId" component={FilmDetail} />
        </Route>

        <Route path="/browse/:filmType/:sortBy" component={BrowsePage}>
          <Route path=":filmId" component={FilmDetail} />
        </Route>

        <Route path="/watch/:chapterId" component={WatchPage} />

      </Route>

      <Redirect from="*" to="/" />
    </Router>
  </Provider>,
  document.querySelector('#app')
)
