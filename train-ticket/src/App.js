import React, { useState, PureComponent,useMemo, useCallback, useRef, useEffect } from 'react';
import './App.css';


// const Foo = memo(function Foo(props) {
//   console.log('渲染');
//   return (
//     <h1 onClick={props.onClick}>{props.title}</h1>
//   )
// })
class Foo extends PureComponent {
  mems () { // 第一种使用场景
    console.log(this.props.title);
  }
  render () {
    console.log('渲染');
    return (
      <h1 onClick={this.props.onClick}>{this.props.title}</h1>
    )
  }
}

function App (props) {
  const [title, setNum] = useState(0)
  const [lest, setLest] = useState(0)
  const contRef= useRef()
  const it = useRef()

  const fun = useCallback(() => {
    console.log('callback')
    setLest((le) => le + 1)

    contRef.current.mems(); // 第一种使用场景
  }, [contRef])

  const num = useMemo(() => {
    return title * 2
  }, [title]) // 这么写会有报错，不过可以实现

  useEffect(() => {
    it.current = setInterval(() => { // Ref的第二种使用场景
      setNum(title => title +1)
    }, 1000)
  }, [])
  useEffect(() => {
    if (num >= 10) {
      clearInterval(it.current)
    }
  })

  return (
    <div>
      <button onClick={() => setNum(title + 1)}>
        Add
      </button>-
      <button onClick={() => setLest(lest + 1)}>
        {lest}
      </button>
      <Foo onClick={fun} ref={contRef} title={num}></Foo>
    </div>
  )
}

export default App;
