const SEASON_REGEXP = /^s(\d+)e(\d+)$/gi;

const addSeasonToChapter = chapter => {
  let key = chapter.title;
  let season, episode;
  const matches = (/s(\d+)e(\d+)/gi).exec(chapter.title);
  if (matches) {
    season = parseInt(matches[1], 10);
    episode = parseInt(matches[2], 10);
    key = `${season}-${episode}`;
  }
  return { ...chapter, season, episode };
}

const fetchShowEpisodes = showTitle =>
  window.fetch(`http://api.tvmaze.com/singlesearch/shows?q=${showTitle}&embed=episodes`)
    .then(raw => raw.json()) // Get json body
    .then(({ _embedded: { episodes } }) => episodes) // only get episodes
    .then(data => data.reduce((prev, e) => ({ ...prev, [`${e.season}-${e.number}`]: e }), {}))
    .catch(error => { console.error(error); return {}; });

export function fetchEpisodeDetails(movie) {
  const { chapters, title } = movie;
  const hasSeasons = chapters.some(c => SEASON_REGEXP.test(c.title));

  // Test if there are any detectable seasons
  if (!hasSeasons) {
    console.warn('Could not find any seasons for movie', title);
    return { ...movie, hasSeasons: false };
  }

  const chaptersWithSeason = chapters.map(addSeasonToChapter);
  return fetchShowEpisodes(title)
    .then(episodes => chaptersWithSeason.map(chapter => ({
        ...chapter,
        ...episodes[chapter.season ? `${chapter.season}-${chapter.episode}` : chapter.title]
    })))
    .then(chapters => ({ ...movie, hasSeasons: true, chapters }))
}
