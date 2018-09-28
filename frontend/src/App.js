import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Directions from './pages/Directions';
import Report from './pages/Report';
import Demo from './pages/Demo';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div style={{width: '100%', height: '100%'}}>
          <Switch>
            <Route path={'/report/'} exact component={Report} />
            <Route path={'/map/'} exact component={Directions} />
            <Route path={'/home/'} exact component={Home} />
            <Route path={'/demo/'} exact component={Demo} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
