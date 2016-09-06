import { decryptBlob } from 'utils/irpc'
import isEmpty from 'lodash/isEmpty'

const API_BASE = 'http://qazwsxedcrfvtgb.info/cbox'
// const API_BASE = 'http://167.114.102.196/cbox'
// const API_BASE = 'http://playboxhd.com/api/box'

const transformParserArray = (accumulator, {t: id, p: parser}) => {
  accumulator[id] = parser
  return accumulator
}

const get = (urlSearchParams) => {
  urlSearchParams.set('os', 'ios')
  urlSearchParams.set('a', 'app0')

  let url = new URL(`${API_BASE}?${urlSearchParams.toString()}`)

  return window.fetch(url, {
    referrerPolicy: 'no-referrer',
    method: 'GET',
  })
  .then(response => response.json())
  .then(({data, cf}) => {

    if (isEmpty(data)) {
      return Promise.reject('Empty response')
    } else {
      decryptBlob(cf)
        .then(config => (
          window.parserDictionary = JSON.parse(config).pd
            .reduce(transformParserArray, {})
        ))
      return data
    }
  })

}

export function fetchMovies(type, sort = 'popular') {
  return get(
    new URLSearchParams(`type=${sort}&t=${type}`)
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
  let params = new URLSearchParams(`type=stream&id=${id}`)

  // params.set('v', '1.0')
  // params.set('k', '0')
  // params.set('jav', 'xxx')
  // params.set('h', 'F80F15A92B180F24CB17C7EA6FB10FF9')
  // params.set('t', Math.floor(Date.now() / 1000))
  // params.set('ui', '%7B%22osversion%22:%229.3.3%22,%22app%22:%22app0%22,%22device%22:%22iphone%22,%22deviceid%22:%22B35DB806676F96BA4BEC5F5353DB253E%22,%22version%22:%221.1%22%7D')

  return get (
    params
  )
}
