import React, { Fragment } from 'react';
import TodoItem from './todoItem';

class App extends React.Component {
  constructor (props) {
    super(props)
    this.setChange = this.setChange.bind(this)
    this.setKey = this.setKey.bind(this)
    this.liClick = this.liClick.bind(this)
    this.state = {
      inputValue: '',
      list: []
    }
  }
  setChange (e) {
    this.setState({
      inputValue: e.target.value
    })
  }
  setKey (e) {
    if (e.keyCode === 13) {
      const list = [...this.state.list, this.state.inputValue]
      this.setState({
        list,
        inputValue: ''
      })
    }
  }
  liClick (index) {
    const list = [...this.state.list]
    list.splice(index, 1)
    this.setState({
      list
    })
  }
  handMenu () {
    return this.state.list.map((item, index) => {
     return (
      <TodoItem
        value={ item }
        key={ index }
        index= { index }
        liClickFunction= { this.liClick }
      />
     )
     // (
     //  <li
     //    key={ index }
     //    onClick={ this.liClick.bind(this, index) }
     //    dangerouslySetInnerHTML={{__html: item}}
     //  >
     //  </li>
     // )
    })
  }
  render () {
    return (
      <Fragment>
        {/* 这是注释 */}
        <label htmlFor="myInput">
          请输入内容：
          <input
          id="myInput"
          type="text"
          value={ this.state.inputValue }
          onChange={ this.setChange }
          onKeyUp={ this.setKey }
          />
        </label>
        <ul>
          { this.handMenu() }
        </ul>
      </Fragment>
    )
  }
}

export default App;
