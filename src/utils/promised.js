import { hashHistory } from 'react-router'

export default function promised(target, key, descriptor) {
  let method = descriptor.initializer()
  descriptor.initializer = () => ({ params, location }, callback) => {
    method(params, location)
      .then((...args) => callback(null, ...args))
      .catch(error => {
        if (process.env.DEV) {
          throw error
        } else {
          hashHistory.replace('/')
        }
      })
  }
  return descriptor
}
