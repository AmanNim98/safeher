import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
  }
});

class Report extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        Report
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Report);
