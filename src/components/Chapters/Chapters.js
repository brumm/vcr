import React from 'react'
import Flex from 'flex-component'
import { Link } from 'react-router'
import _ from 'lodash'

import style from './Chapters.scss'

const ChapterRow = ({ episode, name, runtime, title }) => (
  <Flex grow={1} className={style.ChapterRow}>
    <Flex grow={0} shrink={0} className={style.ChapterRowEpisode}>{episode}.</Flex>
    <Flex grow={1}>
      {name || title}
    </Flex>
    {
      runtime &&
      <Flex grow={0} shrink={0} className={style.ChapterRowRuntime}>{runtime}min</Flex>
    }
  </Flex>
);

const SeasonHeader = ({ season }) =>
  <h2 className={style.SeasonHeader}>Season: {season}</h2>;

export default ({ chapters }) => {
  const seasons = _.groupBy(chapters, 'season');

  return (
    <Flex direction="column" shrink={0}>
      {
        Object.keys(seasons).map(season => (
          <Flex direction='column'>
            <SeasonHeader season={season} />
            {
              seasons[season].map(chapter => (
                <Link
                  style={{ display: 'flex', alignItems: 'center', flexShrink: 0, minHeight: 25 }}
                  key={chapter.id}
                  to={{ pathname: `/watch/${chapter.id}`, state: { title: chapter.title, chapters }}}
                >
                  <ChapterRow {...chapter} />
                </Link>
              ))
            }
          </Flex>
        ))
      }
    </Flex>
  )
}
