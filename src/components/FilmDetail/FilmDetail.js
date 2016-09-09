import React from 'react'
import Flex from 'flex-component'
import Slider from 'react-slick'
import { Link, withRouter } from 'react-router'
import scrollIntoView from 'scroll-iv'

import CloseIcon from 'react-icons/lib/fa/close'
import PlayIcon from 'react-icons/lib/fa/play'

import BackLink from 'components/BackLink'
import { fetchDetail } from 'utils/api'
import promised from 'utils/promised'

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

  @promised static loadProps = ({ filmId }) => (
    fetchDetail(filmId).then(
      movie => ({ ...movie })
    )
  )

  shouldComponentUpdate({ id }) {
    return id !== this.props.id
  }

  render() {
    const {
      title, description, poster, images, chapters,
      location: { state: { rowKey, basePath }}
    } = this.props

    let rowElement = document.getElementById(rowKey)
    if (rowElement) { scrollIntoView(rowElement) }

    return (
      <Flex className={style.Container}>
        <Flex className={style.Description} direction='column' shrink={0}>

          <Flex className={style.Title}>{title}</Flex>
          <Flex grow={1} className={style.Text}>{description}</Flex>

          <BackLink label={<CloseIcon/>} path={basePath} className={style.closeIcon} />
        </Flex>

        {chapters.length > 1 &&
          <Flex direction='column' className={style.Episodes} grow={1} shrink={0}>
            {chapters.map(chapter => (
              <Link style={{ display: 'flex', alignItems: 'center', flexShrink: 0, minHeight: 25 }} key={chapter.id} to={{
                pathname: `/watch/${chapter.id}`,
                state: { title: chapter.title, basePath }
              }}>
                {chapter.title}
              </Link>
            ))}
          </Flex>
        }

        {chapters.length === 1 &&
          <Flex className={style.Slider} grow={1}>
              <Link
                className={style.playLink}
                to={{
                  pathname: `/watch/${chapters[0].id}`,
                  state: { title, basePath }
                }}
              >
                <PlayIcon className={style.playIcon} />
              </Link>

            {chapters.length === 1 && images && (
              <Slider {...settings}>
                {images.map((image, index) => <img className={style.Image} key={index} src={image} referrerPolicy='no-referrer' />)}
              </Slider>
            )}
          </Flex>
        }
      </Flex>
    )
  }
}
