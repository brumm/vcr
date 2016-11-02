import Cache from 'utils/cache'
const cache = new Cache(1000 * 60 * 5)

const SEASON_REGEXP = /(?:s(?:eason)?(?:\s)?(\d+)(?:\s+)?)?e(?:pisode)?(?:\s)?(\d+)/i

const addSeasonToChapter = chapter => {
  const [_, season = 1, number] = chapter.title.match(SEASON_REGEXP) || []

  return {
    ...chapter,
    season: parseInt(season, 10) || undefined,
    number: parseInt(number, 10) || undefined,
  }
}

const fetchShowEpisodes = showTitle => {
  const url = `http://api.tvmaze.com/singlesearch/shows?q=${showTitle}&embed=episodes`
  let promise = cache.has(url)
    ? Promise.resolve(cache.get(url))
    : window.fetch(url)
      .then(response => response.json())
      .then(json => {
        cache.set(url, json)
        return json
      })

  return promise
    .then(({ _embedded: { episodes } }) => episodes)
    .then(episodes => (
      episodes.reduce((episodes, { id, ...episode }) => ({
        ...episodes,
        [`${episode.season}-${episode.number}`]: episode
      }), {})
    ))
    .catch(error => console.error(error) || {})
}

export function fetchEpisodeDetails(movie) {
  const { chapters, title } = movie
  const hasSeasons = chapters.some(({ title }) => SEASON_REGEXP.test(title))

  // bail if there aren't any detectable seasons
  if (!hasSeasons) {
    console.warn('Could not find any seasons for movie', title)
    return { ...movie, hasSeasons }
  }

  const chaptersWithSeason = chapters.map(addSeasonToChapter)

  return fetchShowEpisodes(title)
    .then(episodes => chaptersWithSeason.map(chapter => {
      return ({
          ...chapter,
          ...episodes[
            chapter.season
              ? `${chapter.season}-${chapter.number}`
              : chapter.title
          ]
      })
    }))
    .then(chapters => ({ ...movie, hasSeasons, chapters }))
}
