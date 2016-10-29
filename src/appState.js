import { observable, action, reaction, useStrict } from 'mobx'

useStrict(true)

class AppState {
  @observable appState = {
    films: {}
  }

  constructor(appState) {
    this.hydrateState(appState)
  }

  @action hydrateState = appState => this.appState = { ...this.appState, ...(appState || {}) }

  @action setTimeFor = (filmId, { currentTime, duration }) => this.appState.films = {
    ...this.appState.films,
    [filmId]: { currentTime, duration }
  }

  isWatched = id => Object.keys(this.appState.films).includes(`${id}`)
  toJSON = () => JSON.stringify(this.appState)
}

const appState = new AppState(
  JSON.parse(localStorage.getItem('appState'))
)

reaction(
  'appState', () => appState.toJSON(),
  appState => localStorage.setItem('appState', appState)
)

export default appState
