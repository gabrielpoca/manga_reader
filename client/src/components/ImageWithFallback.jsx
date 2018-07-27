import * as React from 'react'

class ImageWithFallback extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      src: props.src
    }
  }

  handleError = () => {
    this.setState({
      src: this.props.fallback
    })
  }

  render() {
    return (
      <img
        alt="A manga cover."
        style={this.props.style}
        className={this.props.className}
        src={this.state.src}
        onError={this.handleError}
      />
    )
  }
}

export default ImageWithFallback
