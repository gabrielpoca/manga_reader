import * as React from 'react';
import CSSModules from 'react-css-modules';

const icon = require('./icon.svg');
const styles = require('./styles.css');

class Search extends React.Component {
  shouldComponentUpdate(props) {
    return props.value !== this.props.value;
  }

  render() {
    return (
      <label styleName="root">
        <input
          name="query"
          onChange={e => this.props.onChange(e.target.value)}
          placeholder="My favorite manga"
          styleName="input"
          type="text"
          value={this.props.value}
        />
        <span styleName="icon">
          <span dangerouslySetInnerHTML={{ __html: icon }} />
        </span>
        <button styleName="clear" onClick={() => this.props.onChange('')}>
          x
        </button>
      </label>
    );
  }
}

export default CSSModules(Search, styles, { allowMultiple: true });
