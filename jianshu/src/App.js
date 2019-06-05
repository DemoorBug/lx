import React from 'react';
import Header from './common/header';
import { Globalstyle } from './reset.js';
import { Iconfont } from './statics/iconfont/iconfont';

class App extends React.Component {
  render () {
    return (
      <React.Fragment>
        <Globalstyle />
        <Iconfont />
        <Header />
      </React.Fragment>
    )
  }
}

export default App;
