export default function promised(target, key, descriptor) {
  let method = descriptor.initializer()
  descriptor.initializer = () => ({ params }, callback) => {
    method(params)
      .then((...args) => callback(null, ...args))
      .catch(error => {
        console.error(error)
        window.location.replace(window.location.origin)
      })
  }
  return descriptor
}
