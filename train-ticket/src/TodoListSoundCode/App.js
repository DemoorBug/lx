import React, { useState, useCallback, useRef, useEffect, memo } from 'react';
import './App.css';

let idSeq = Date.now()

const Control = memo(function Control(props) {
  const { addTodo } = props
  const inputRef = useRef()

  const onSubmit = (e) => { // 没有像任何子组件传递，所以就没有必要包裹callback
    e.preventDefault()

    const newText = inputRef.current.value.trim()

    if (newText.length === 0) {
      return
    }
    addTodo({
      id: ++idSeq,
      text: newText,
      complate: false
    })

    inputRef.current.value = ''
  }

  return (
    <div className="control">
      <h1>todos</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          ref={inputRef}
          className="new-todo"
          placeholder="what needs to be done?"
        />
      </form>
    </div>
  )
})

const TodoItem = memo(function TodoItem(props) {
  const {
    todo: {
      id,
      text,
      complate
    },
    toggleTodo,
    removeTodo
  } = props
  const onChange = () => {
    toggleTodo(id)
  }
  const onRemove = () => {
    removeTodo(id)
  }
  console.log('0');
  return (
    <li className="todo-item">
      <input
        type="checkbox"
        onChange={onChange}
        checked={complate}
      />
      <label className={complate ? 'complate' : ''}>{text},{String(complate)}</label>
      <button onClick={onRemove}>&#xd7;</button>
    </li>
  )
})

const Todos = memo(function Todos(props) {
  const { todos, toggleTodo, removeTodo } = props
  return (
    <ul>
      {
        todos.map(todo => {
          return <TodoItem
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            removeTodo={removeTodo}
          />
        })
      }
    </ul>
  )
})
const LS_KEY = '$-todos_';
function TodoList() {
  const [todos, setTodos] = useState([])

  const addTodo = useCallback((todo) => {
    setTodos(todos => [...todos, todo])
  }, [])
  const removeTodo = useCallback((id) => {
    setTodos(todos => todos.filter(todo => {
      return todo.id !== id
    }))
  }, [])
  const toggleTodo = useCallback((id) => {
    setTodos(todos => todos.map(todo => {
      return todo.id === id
        ? {
          ...todo,
          complate: !todo.complate
        }
        : todo;
    }))
  }, [])


  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem(LS_KEY) || '[]')
    setTodos(todos)
  }, [])
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(todos))
  }, [todos])
  return (
    <div className="todo-list">
      <Control
        addTodo={addTodo}
      />
      <Todos
        removeTodo={removeTodo}
        toggleTodo={toggleTodo}
        todos={todos}
      />
    </div>
  )
}

export default TodoList;
