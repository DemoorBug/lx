import React from 'react';
import Header from './common/header';
import store from './store';
import { Provider } from 'react-redux';
import { Globalstyle } from './reset.js';
import { Iconfont } from './statics/iconfont/iconfont';

class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <Globalstyle />
        <Iconfont />
        <Header />
      </Provider>
    )
  }
}

export default App;
