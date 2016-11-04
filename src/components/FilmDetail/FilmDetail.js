import React from 'react'
import Flex from 'flex-component'
import Slider from 'react-slick'
import { Link, withRouter } from 'react-router'

import sortBy from 'lodash/sortBy'

import CloseIcon from 'react-icons/lib/fa/close'
import PlayIcon from 'react-icons/lib/fa/play'

import BackLink from 'components/BackLink'
import { fetchDetail } from 'utils/api'
import { fetchEpisodeDetails } from 'utils/showDataApi'
import promised from 'utils/promised'

import Chapters from 'components/Chapters'

import { highlightColor } from 'variables.scss'
import style from './FilmDetail.scss'

const settings = {
  variableWidth: true,
  lazyLoad: true,
  draggable: false,
  autoplaySpeed: 4000,
  speed: 1000,
  autoplay: true,
}

@withRouter
export default class FilmDetail extends React.Component {

  @promised static loadProps = ({ filmId, filmType }) => (
    fetchDetail(filmId)
      .then(movie => ({ ...movie, filmId }))
      .then(movie => (
        filmType !== 'movie'
          ? fetchEpisodeDetails(movie)
          : movie
      ))
  )

  shouldComponentUpdate({ id }) {
    return id !== this.props.id
  }

  render() {
    let {
      title,
      description,
      poster,
      hasSeasons,
      images,
      chapters,
      filmId,
      location: { state }
    } = this.props

    chapters = sortBy(chapters, 'title')
    state = state === null ? {} : state
    const { basePath } = state
    const isShow = chapters.length > 1

    return (
      <Flex className={style.Container}>
        <Flex className={style.Description} direction='column' shrink={0}>

          <Flex className={style.Title}>{title}</Flex>
          <Flex grow={1} className={style.Text}>{description}</Flex>

          <BackLink label={<CloseIcon/>} path={basePath} className={style.closeIcon} />
        </Flex>

        {isShow ? (
          <Chapters hasSeasons={hasSeasons} chapters={chapters} />
        ) : (
          <Flex className={style.Slider} grow={1}>
              <Link
                className={style.playLink}
                to={{ pathname: `/watch/${chapters[0].id}`, state: { title, filmId } }}
              >
                <PlayIcon className={style.playIcon} />
              </Link>

            {images && (
              <Slider {...settings}>
                {images.map((image, index) => <img className={style.Image} key={index} src={image} referrerPolicy='no-referrer' />)}
              </Slider>
            )}
          </Flex>
        )}
      </Flex>
    )
  }
}
