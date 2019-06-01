import React from 'react';
import 'antd/dist/antd.css';
import store from './store';
import TodoItemUi from './TodoItemUi'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = store.getState()
    store.subscribe(() => {
      this.setState(store.getState())
    })
  }
  render () {
    return <TodoItemUi state={this.state}/>
  }
}

export default App;
