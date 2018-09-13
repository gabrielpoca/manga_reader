import React from 'react';

const styles = require('./styles.css');

class Text extends React.PureComponent {
  render() {
    return (
      <div>
        <label className={styles.label} htmlFor={this.props.fieldName}>
          {this.props.label}
        </label>
        <input
          type="text"
          id={this.props.fieldName}
          value={this.props.value || ''}
          onChange={e => this.props.onChange(e.target.value)}
          className={styles.input}
        />
      </div>
    );
  }
}

export default Text;
