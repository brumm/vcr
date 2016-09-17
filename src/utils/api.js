import { decryptBlob } from 'utils/irpc'
import isEmpty from 'lodash/isEmpty'

import Cache from 'utils/cache'

const API_BASE = 'http://qazwsxedcrfvtgb.info/cbox'
// const API_BASE = 'http://167.114.102.196/cbox'
// const API_BASE = 'http://playboxhd.com/api/box'

const cache = new Cache(1000 * 60 * 5)

const transformParserArray = (accumulator, {t: id, p: parser}) => {
  accumulator[id] = parser
  return accumulator
}

const get = (urlSearchParams) => {
  urlSearchParams.set('os', 'ios')
  urlSearchParams.set('a', 'app0')

  let url = new URL(`${API_BASE}?${urlSearchParams.toString()}`)

  let promise = cache.has(urlSearchParams.toString())
    ? Promise.resolve(cache.get(urlSearchParams.toString()))
    : window.fetch(url, {
      referrerPolicy: 'no-referrer',
      method: 'GET',
    })
    .then(response => response.json())
    .then(json => {
      cache.set(urlSearchParams.toString(), json)
      return json
    })

  return promise
    .then(({ data, cf: config }) => {
      if (!isEmpty(data)) {
        decryptBlob(config)
          .then(json => {
            let { pd: parserDictionary, ...cbConfig } = JSON.parse(json)
            // window.cbConfig = cbConfig
            window.parserDictionary = parserDictionary.reduce(transformParserArray, {})
          })
      }
      return data
    })
}

export function fetchMovies({filmType, sortBy, page}) {
  return get(
    new URLSearchParams(`type=${sortBy}&t=${filmType}&page=${page}`)
  )
}

export function searchMovies(searchTerm) {
  return get(
    new URLSearchParams(`type=search&keyword=${searchTerm}`)
  )
}

export function fetchDetail(id) {
  return get(
    new URLSearchParams(`type=detail&id=${id}`)
  )
}

export function fetchSpecials() {
  return get(
    new URLSearchParams(`?type=list&t=box`)
  )
}

export function fetchCategories() {
  return get(
    new URLSearchParams(`?type=listcat`)
  )
}

export function fetchStream(id) {
  return get (
    new URLSearchParams(`type=stream&id=${id}`)
  )
}
