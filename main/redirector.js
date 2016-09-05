import fetch from "node-fetch"

export default function redirector(url) {
  return fetch(url, {
    method: 'HEAD',
    redirect: 'manual'
  })
  .then(({ status, headers }) => {
    const location = headers.get('Location')
    return Promise.resolve({ status, location })
  })
}
