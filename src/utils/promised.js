export default function promised(target, key, descriptor) {
  let method = descriptor.initializer()
  descriptor.initializer = () => ({ params }, callback) => {
    method(params)
      .then((...args) => callback(null, ...args))
      .catch(error => {
        if (process.env.DEV) {
          throw error
        } else {
          window.location.replace(window.location.origin)
        }
      })
  }
  return descriptor
}
