const crypto = require('crypto')

const IOS_KEY = new Buffer('1234567890qwertyuiopasdfghjklzxc')

export default function decrypt(url) {
  url = new Buffer(url, 'base64')

  var decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    IOS_KEY,
    new Buffer('\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00')
  )

  url = decipher.update(url)
  url += decipher.final('utf8')

  return url
}
