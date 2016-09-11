import React from 'react'

export default class Pinky extends React.Component {
  constructor(props) {
    super(props)
    this.handlePromise(props.promise)
  }

  componentDidMount() {
    this._isMounted = true
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  shouldComponentUpdate({ promise }, { error, pending, data }) {
    if (promise !== this.props.promise) {
      this.handlePromise(promise)
    }

    let shouldUpdate = ![
      error === this.state.error,
      pending === this.state.pending,
      data === this.state.data
    ].every(Boolean)

    return shouldUpdate
  }

  handlePromise(promise) {
    promise.then(data => this._isMounted && this.setState({ data, pending: false, error: false }))
    promise.catch(error => this._isMounted && this.setState({ data: false, pending: false, error }))
  }

  state = {
    error: null,
    pending: true,
    data: null,
  }

  render() {
    return this.props.children({
      error: this.state.error,
      pending: this.state.pending,
      data: this.state.data
    })
  }
}
