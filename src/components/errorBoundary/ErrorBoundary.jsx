import { Component } from 'react'

export class ErrorBoundary extends Component {
  state = {
    error: false,
  }

  componentDidCatch(error, errorInfo) {
    console.log('error: ', error)
    console.log('errorInfo: ', errorInfo)

    this.setState({
      error: true,
    })
  }

  render() {
    if (this.state.error) {
      return <h1>ErrorBoundary - Something went wrong</h1>
    }

    return this.props.children
  }
}
