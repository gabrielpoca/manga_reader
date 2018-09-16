import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as manga from '../../manga';

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
    return this.props.backup();
  };

  handleRestore = file => {
    return this.props.restore(file);
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
      backup: manga.actions.backup,
      restore: manga.actions.restoreRequested,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Show);
