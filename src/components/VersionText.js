import React, { Component } from 'react'
import PropTypes from 'prop-types'

class VersionText extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired
  }
  constructor (props) {
    super(props)
    this.state = {
      offset: 0
    }
  }

  componentDidMount = () => {
    const spinInterval = setInterval(this.doSpin, (1 / 4) * 1000)
    this.setState({ spinInterval })
  }

  componentWillUnmount= () => {
    clearInterval(this.state.spinInterval)
  }

  doSpin = () => {
    let { offset } = this.state
    if (offset <= 0) { offset = 360 } else { offset = offset - 2 }
    this.setState({ offset })
  }

  renderVersion = (text) => {
    return ((text || '').split('')).map((letter, key) => {
      const mod = ~~(360 * (key / text.length)) + this.state.offset
      return (<span key={key} style={{ color: `hsl(${mod}, 50%, 50%)` }}>{letter}</span>)
    })
  }

  render = () => {
    const version = 'closed-alpha-0.0.1q'
    const { text } = this.props
    return (
      <div>
        <span>{this.renderVersion(version)}</span>
        <span>{this.renderVersion(text)}</span>
      </div>
    )
  }
}

export default VersionText
