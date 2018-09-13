import * as React from 'react';
import CSSModules from 'react-css-modules';

const icon = require('./icon.svg');
const styles = require('./styles.css');

class Search extends React.Component {
  constructor() {
    super();
    this.state = { focus: false };
  }

  componentDidMount() {
    if (this.props.value && this.props.value !== '') {
      this.setState({ focus: true });
    }
  }

  handleChange = event => {
    this.props.onChange(event.target.value);
  };

  handleFocus = () => this.setState({ focus: true });
  handleBlur = () => {
    if (!this.props.value || this.props.value === '') {
      this.setState({ focus: false });
    }

    this.props.onBlur();
  };

  render() {
    const rootClassName = `root ${this.state.focus ? 'focus' : ''}`;

    return (
      <label styleName={rootClassName}>
        <input
          name="query"
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          placeholder="My favorite manga"
          styleName="input"
          type="text"
          value={this.props.value}
        />
        <span styleName="icon">
          <span dangerouslySetInnerHTML={{ __html: icon }} />
        </span>
      </label>
    );
  }
}

export default CSSModules(Search, styles, { allowMultiple: true });
