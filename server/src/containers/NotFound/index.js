import React, {
  useEffect
} from 'react'

const NotFound = (props) => {
  // props.staticContext.NotFound = true;
  // useEffect(() => { 因为是服务端代码，所以不能用生命周期，老师逻辑有问题哦
    if (props.staticContext) {
      // console.log('服务端也执行？');
      props.staticContext.NotFound = true;
    }
  // }, [])
  return (
    <div>NotFound</div>
  )
}

export default NotFound
