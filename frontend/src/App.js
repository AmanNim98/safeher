import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Home from './pages/Home';
import Directions from './pages/Directions';
import Report from './pages/Report';

const drawerWidth = 240;
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#000000',
    },
  },
});

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    marginTop: 0,
    backgroundColor: theme.palette.background.default,
    padding: 0,
    overflow: 'scroll',
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <div className={classes.root}>
            <div className={classes.content}>
              <Switch>
                <Route path={'/report/'} exact component={Report} />
                <Route path={'/map/'} exact component={Directions} />
                <Route path={'/home/'} exact component={Home} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
