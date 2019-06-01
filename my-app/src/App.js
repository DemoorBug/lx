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
  componentDidMount() {
    store.dispatch({
      type: 'my-sagas'
    })
    // axios.get('http://localhost:3000/mock/index.json').then(data => {
    //   data = data.data.data
    //   store.dispatch({
    //     type: 'getIndex_app',
    //     data
    //   })
    // })
  }
}

export default App;
