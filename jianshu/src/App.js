import React from 'react';
import Header from './common/header';
import store from './store';
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux';
import { Globalstyle } from './reset.js';
import { Iconfont } from './statics/iconfont/iconfont';
import Home from './pages/home'
import Detail from './pages/detail'

class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <Globalstyle />
        <Iconfont />
        <Header />
        <BrowserRouter>
          <Route path="/" exact component={Home} />
          <Route path="/detail" exact component={Detail} />
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App;
