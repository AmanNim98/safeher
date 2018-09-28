import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	root: {
		color: "blue",
	}
});

class Home extends Component {
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				SafeHer
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(Home);