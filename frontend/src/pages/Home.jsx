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
				<div className="left">
					<h1 style={{color: 'white'}}>SafeHER</h1>
					<p>-"Cuz it's the best we can do"</p>	
				</div>
				<div  className="right">	
					<button className="buttons" onClick={() => this.props.history.push('/map/')}>FIND WAY</button>
					<br />
					<button className="buttons1" onClick={() => this.props.history.push('/report/')}>REPORT</button>
				</div>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(Home);