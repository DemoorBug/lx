import React from 'react';
import PropTypes from 'prop-types'

class TodoItem extends React.Component {
  render () {
    const { value, index, liClickFunction, test } = this.props
    return (
      <li
        onClick={ () => {
          liClickFunction(index)
        } }
      >
        { test }-{ value }
      </li>
    )
  }
}
TodoItem.propTypes = {
  value: PropTypes.string,
  index: PropTypes.number,
  liClickFunction: PropTypes.func,
  test: PropTypes.string.isRequired
}
TodoItem.defaultProps = {
  test: '我是字符串'
}

export default TodoItem
