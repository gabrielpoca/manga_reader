import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as manga from '../../manga';
import * as notifications from '../../notifications';

import SettingsShow from '../components/SettingsShow';

class Show extends Component {
  constructor(props) {
    super(props);

    this.state = { error: false };
  }

  async componentDidMount() {
    if (!navigator.storage) {
      return;
    }

    const { usage, quota } = await navigator.storage.estimate();

    this.setState({ percentage: Math.round(usage / quota) });
  }

  exportingData() {
    const { ongoingMangas, readChapters } = this.props;

    const ongoing = ongoingMangas.reduce((memo, manga) => {
      memo[manga.id] = manga.ongoingChapter;
      return memo;
    }, {});

    return { ongoingMangas: ongoing, readChapters };
  }

  handleBackup = () => {
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.style = 'display: none';

    const json = JSON.stringify(this.exportingData());
    const blob = new Blob([json], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = 'manga-reader.json';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  handleRestore = file => {
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const { ongoingMangas, readChapters } = JSON.parse(reader.result);
        this.props.restoreBackup(ongoingMangas, readChapters);
        this.props.history.push('/');
      } catch (e) {
        this.props.sendNotification(
          'error',
          'Something went wrong parsing your file. Please make sure that you have selected a valid back-up.'
        );
      }
    };

    reader.onerror = () =>
      this.props.sendNotification(
        'error',
        'Something went wrong loading your file. Please make sure that you have selected a valid back-up.'
      );

    reader.readAsText(file);
  };

  render() {
    return (
      <SettingsShow
        onRestore={this.handleRestore}
        onBackup={this.handleBackup}
        usagePercentage={this.state.percentage}
      />
    );
  }
}

const mapStateToProps = (state, props) => {
  return manga.filters.getStateForBackup(state);
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      restoreBackup: manga.actions.restoreBackup,
      sendNotification: notifications.actions.sendNotification
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Show);
