import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as manga from '../../manga';
import * as notifications from '../../notifications';

import SettingsPage from '../components/SettingsPage';

class Show extends React.Component {
  exportingData() {
    const { ongoingMangas, readChapters } = this.props.userProgress;

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
      <SettingsPage
        {...this.props}
        onRestore={this.handleRestore}
        onBackup={this.handleBackup}
      />
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    userProgress: manga.filters.getStateForBackup(state),
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      restoreBackup: manga.actions.restoreBackup,
      sendNotification: notifications.actions.sendNotification,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Show);
