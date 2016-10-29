import React from 'react'
import Flex from 'flex-component'
import { hashHistory } from 'react-router'
import merge from 'lodash/merge'
import NextIcon from 'react-icons/lib/fa/step-forward'
import KeyHandler from 'react-key-handler'

import { Media, controls } from 'react-media-player'
const { CurrentTime } = controls

import Player, {
  Progress,
  PlayPause,
  MuteUnmute,
  Volume,
} from 'components/Player'

import Loader from 'components/Loader'
import BackLink from 'components/BackLink'
import Titlebar from 'components/Titlebar'
import Pinky from 'react-pinky-promise'

import { decryptBlob } from 'utils/irpc'
import { fetchStream } from 'utils/api'
import promised from 'utils/promised'
import parserDictionary from 'parser-dictionary.json'
import byQuality from 'utils/byQuality'
import parseLink from 'utils/parseLink'

import style from './WatchPage.scss'

const Next = ({ nextChapter: { id, title }, chapters }) => (
  <button className={style.ControlButton} onClick={() => hashHistory.replace({
    pathname: `/watch/${id}`,
    state: { title, chapters }
  })}>
    <NextIcon />
  </button>
)

export default class WatchPage extends React.Component {
  state = {
    streamIndex: 0
  }

  @promised static loadProps = ({ chapterId }) => (
    fetchStream(chapterId)
      .then(sources => sources.sort(byQuality))
      .then(sources => {
        const encryptedStreams = sources.map(({ stream }) => stream)
        return Promise.all(encryptedStreams.map(decryptBlob))
          .then(decryptedStreams => decryptedStreams.map(url => ({ url })))
          .then(decryptedStreams => ({
            streams: merge(sources, decryptedStreams)
          }))
      })
  )

  fetchSource({ url, parseType }) {
    const parser = (window.parserDictionary || parserDictionary)[parseType]
    if (!parser) {
      throw new Error(`no parser for parseType ${parseType}`)
    }
    return parseLink(url, parser)
  }

  render() {
    const { streams, location: { state }, params: { chapterId }} = this.props
    const { streamIndex } = this.state
    const stream = this.props.streams[streamIndex]

    if (state.chapters) {
      var nextChapter = state.chapters[
        state.chapters.findIndex(({ id }, index) => id == chapterId) + 1
      ]
    }

    const fetchPromise = this.fetchSource(stream)
      .catch(() => {
        if (streamIndex !== streams.length - 1) {
          this.setState({ streamIndex: streamIndex + 1 })
        } else {
          console.error('no working stream');
        }
      })

    return (
      <Pinky promise={fetchPromise}>
        {({resolved}) => resolved ? (

          <Player src={resolved} vendor='video' onError={console.error} autoPlay>
            {media => ([
              <KeyHandler keyEventName='keydown' keyValue='Escape'
                key='handler'
                onKeyHandle={window.history.back}
              />,

              <Titlebar
                floating
                key='titlebar'
                center={state.title}
                right={<BackLink className={style.Quality} label='Close' />}
              />,

              media.isLoading && (
                <Flex key='loader' style={{ width: '100vw', height: '100vh' }} alignItems='center' justifyContent='center'>
                  <Loader />
                </Flex>
              ),

              <Flex key='bottom-controls' className={style.ControlsBottom} alignItems='center'>
                <PlayPause />
                <Progress />
                {state.chapters && nextChapter && <Next nextChapter={nextChapter} chapters={state.chapters} />}
                <CurrentTime style={{ minWidth: 50, textAlign: 'center' }} />
                <MuteUnmute />
                <Volume />
                <select className={style.Quality} value={streamIndex} onChange={({ target: { value }}) => this.setState({ streamIndex: +value })}>
                  {streams.map((stream, index) => <option key={index} value={index}>{stream.quality}</option>)}
                </select>
              </Flex>
            ])}
          </Player>
        ) : (
          <Flex className={style.Loading} alignItems='center' justifyContent='center'>
            <Titlebar
              floating
              key='titlebar'
              center={`${state.title} (Trying stream ${streamIndex + 1} of ${streams.length})`}
              right={<BackLink className={style.Quality} label='Close' />}
            />
            {streamIndex === streams.length - 1 ? <div>
              No working stream, please try again later
            </div> : <Loader />}
          </Flex>
        )}
      </Pinky>
    )
  }
}
