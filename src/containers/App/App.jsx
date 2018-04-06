import React from 'react';
import { Router, Route, Switch } from 'react-router-dom'

import OrderHistory from 'containers/OrderHistory/OrderHistory.jsx';
import { sampleData } from '../../data/sample-data.js';
import styles from './App.scss';

export default class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={OrderHistory}/>
      </Switch>
    )
  }
}
