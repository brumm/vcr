import { getRedirect } from 'utils/irpc'

const LinkType = {
  // DIRECT
  0: url => Promise.resolve(url),

  // MAKE_GET_REQUEST
  1: url => fetch(url).then(res => res.text()),

  // MAKE_HEAD_REQUEST
  2: url => getRedirect(url).then(({ status, location }) => {
    if (status === 403) { throw status }
    return location
  }),

  // BASE64_REQUEST_SERVER
  3: url => console.error('BASE64_REQUEST_SERVER', url)
}

const DecodeType = {
  // DIRECT
  0: url => Promise.resolve(url),

  // URL_DECODE
  1: url => Promise.resolve(decodeURIComponent(url)),

  // ESCAPE_HTML
  2: url => Promise.resolve(escape(url)),

  // ESCAPE_HTML_NUMBER
  3: url => console.error('ESCAPE_HTML_NUMBER', url),

  // URL_ENCODE
  4: url => Promise.resolve(encodeURI(url)),

  // BASE64_DECODE
  5: url => Promise.resolve(new Buffer(url, 'base64').toString())
}

function replace({data, regEx, replacement, matchGroup}) {
  return replacement !== ""
    ? data.replace(RegExp(regEx, 'g'), replacement)
    : data.match(RegExp(regEx))[matchGroup]
}

export default function parseLink(url, {
  l: linkType,
  d: decodeType,
  r: regEx,
  rp: replacement,
  ir: matchGroup,
  i: resultIndex,
  p: subParser,
}) {
  console.info('[parseLink]', { url, linkType, regEx, replacement, decodeType, resultIndex, matchGroup, subParser })
  if (resultIndex !== -1) { console.error('resultIndex was not -1'); }

  return LinkType[linkType](url)
    .then(data => replace({data, regEx, replacement, matchGroup}))
    .then(data => DecodeType[decodeType](data))
    .then(data => {
      return subParser.l === undefined
        ? data
        : parseLink(data, subParser)
    })
}
