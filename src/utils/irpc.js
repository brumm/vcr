import irpc from 'electron-irpc'

const irpcRenderer = irpc.renderer()

export function decryptBlob(blob) {
  return new Promise((resolve, reject) => (
    irpcRenderer.call('decrypt-blob', blob, (err, decryptedUrl) => (
      err ? reject(err) : resolve(decryptedUrl)
    ))
  ))
}

export function getRedirect(url) {
  return new Promise((resolve, reject) => (
    irpcRenderer.call('redirector', url, (err, result) => (
      resolve(result)
    ))
  ))
}
