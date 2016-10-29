import React from 'react'
import Flex from 'flex-component'
import chunk from 'lodash/chunk'
import { Link } from 'react-router'
import { inject, observer } from 'mobx-react'
import scrollIntoView from 'scroll-iv'

import Poster from 'components/Poster'

import { posterWidth, itemMargin } from 'variables.scss'
import style from './FilmList.scss'

@inject('appState') @observer
export default class FilmList extends React.Component {

  state = {
    width: window.innerWidth
  }

  watchResize = () => this.setState({ width: window.innerWidth })

  componentDidMount() {
    window.addEventListener('resize', this.watchResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.watchResize)
  }

  scrollToTop() {
    this.scrollContainer._reactInternalInstance._renderedComponent._hostNode.scrollTop = 0
  }

  scrollIntoView(component) {
    if (component) {
      component._reactInternalInstance._renderedComponent._hostNode.scrollIntoView()
    }
  }

  render() {
    // note that we're casting to Int here
    let itemsPerRow = Math.floor(
      (this.state.width) / (+posterWidth + (+itemMargin * 3))
    )
    const { children, films = [], filmType, basePath, activeFilmId} = this.props

    return (
      <Flex ref={component => this.scrollContainer = component} grow={1} direction='column' className={style.Container}>
        {chunk(films, itemsPerRow).map((row, rowIndex) => {
          let rowActive = row.findIndex(({id}) => `${id}` === activeFilmId) !== -1
          let rowKey = `row-${rowIndex}`

          return (
            <Flex ref={component => rowActive && this.scrollIntoView(component)} key={rowKey} direction='column' shrink={0}>
              <Flex id={rowKey} justifyContent='flex-start' shrink={0} className={style.Row}>
                {row.map(({ id, title, poster }) => {
                  let active = `${id}` === activeFilmId
                  let isWatched = this.props.appState.isWatched(id)

                  return (
                    <Link key={id}
                      to={{
                        pathname: `${basePath}/${id}`,
                        state: { rowKey, basePath, title }
                      }}
                      className={style.MovieItem}
                      activeClassName={style.MovieItemActive}
                    >
                      <Poster url={poster} shrink={rowActive} active={active}>
                        {isWatched &&
                          <div className={style.Progress}>
                            <progress
                              className={style.ProgressWatched}
                              max={this.props.appState.appState.films[id].duration}
                              value={this.props.appState.appState.films[id].currentTime}
                            />
                          </div>
                        }
                      </Poster>
                      {!active &&
                        <Flex alignItems='center' className={style.Title}>
                          <div className={style.ellipsis}>
                            {title}
                          </div>
                        </Flex>
                      }
                    </Link>
                  )
                })}
              </Flex>

              {rowActive && children}
            </Flex>
          )
        })}
      </Flex>
    )
  }
}
