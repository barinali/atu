import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Posts from '../Posts/Posts';
import Post from '../Post/Post';
import styles from './App.css';

class App extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Switch>
          <Route exact path='/' component={Posts} />
          <Route exact path='/:id' component={Post} />
        </Switch>
      </div>
    );
  }
}

export default App;
