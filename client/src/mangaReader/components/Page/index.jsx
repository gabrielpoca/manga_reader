import * as React from 'react';

const styles = require('./styles.css');

class Page extends React.Component {
  componentWillMount() {
    this.addScrollEvent();

    this.setState({ show: false });
  }

  componentDidMount() {
    this.handleScroll();
  }

  componentWillUnmount() {
    this.removeScrollEvent();
  }

  get isEnteringScreen() {
    const windowHeight = document.body.offsetHeight;
    const distanceToWindowBottom = this.el.getBoundingClientRect().top;

    return distanceToWindowBottom < windowHeight * 3;
  }

  addScrollEvent = () => {
    document.addEventListener('scroll', this.handleScroll);
  };

  removeScrollEvent = () => {
    document.removeEventListener('scroll', this.handleScroll);
  };

  handleScroll = () => {
    if (!this.state.show && this.isEnteringScreen) {
      this.setState({ show: true });
      this.removeScrollEvent();
      this.props.onShow(this.props.id);
    }
  };

  renderImage() {
    if (this.state.show) {
      return <img className={styles.image} src={this.props.src} />;
    } else {
      return <div className={styles.placeholder} />;
    }
  }

  render() {
    return (
      <div ref={el => (this.el = el)} key={this.props.id}>
        {this.renderImage()}
      </div>
    );
  }
}

export default Page;
