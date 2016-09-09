import React from 'react'
import Flex from 'flex-component'
import { hashHistory } from 'react-router'
import merge from 'lodash/merge'

import { decryptBlob } from 'utils/irpc'
import { fetchStream } from 'utils/api'
import promised from 'utils/promised'
import parserDictionary from 'parser-dictionary.json'

import Player from 'components/Player'
import byQuality from 'utils/byQuality'
import parseLink from 'utils/parseLink'

export default class WatchPage extends React.Component {

  @promised static loadProps = ({ chapterId, sourceIndex = 0 }) => (
    fetchStream(chapterId)
      .then(sources => sources.sort(byQuality))
      .then(sources => {
        const encryptedStreams = sources.map(({stream}) => stream)

        return Promise.all(encryptedStreams.map(decryptBlob))
          .then(decryptedStreams => decryptedStreams.map(url => ({url})))
          .then(decryptedStreams => merge(sources, decryptedStreams))
          .then(streams => {
            if (streams[sourceIndex] === undefined) { throw 'up' }

            const { url, parseType } = streams[sourceIndex]
            const parser = parserDictionary[parseType]

            return parseLink(url, parser).catch(error => {
              hashHistory.replace(`/watch/${chapterId}/${+sourceIndex + 1}`)
            })
          })
          .then(url => ({
            source: {
              ...sources[sourceIndex],
              location: url
            }
          }))
      })
  )

  render() {
    const { source = {}, location } = this.props

    // this happens after we rescue from broken stream
    // by increasing sourceIndex via history.push
    if (location.state == undefined) {
      location.state = {}
    }
    const { state: { title, basePath } } = location

    return (
      <Player
        src={source.location}
        quality={source.quality}
        basePath={basePath}
        title={title}
      />
    )
  }
}
