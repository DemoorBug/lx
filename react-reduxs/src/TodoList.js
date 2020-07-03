import React, { Fragment } from 'react';
import { connect } from 'react-redux';

class TodoList extends React.Component {
  render () {
    return (
      <Fragment>
        <input
          type="text"
          value={this.props.inputValue}
          onChange={this.props.inputChange}
          onKeyUp={this.props.inputKeyUp}
        />
        <ul>
          {this.props.list.map((item, index) => {
            return (
              <div key={index} onClick={() => {
                this.props.removeKey(index)
              }}>{item}</div>
            )
          })}
        </ul>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    inputValue: state.inputValue,
    list: state.list
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    inputChange (e) {
      dispatch({
        type: 'xiugai',
        value: e.target.value
      })
    },
    inputKeyUp (e) {
      if (e.keyCode === 13) {
        dispatch({
          type: 'submit'
        })
      }
    },
    removeKey (index) {
      dispatch({
        type: 'remove',
        index
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
