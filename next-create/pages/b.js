import { useRef, useState } from 'react'
import { withRouter } from 'next/router'
import { Button } from 'antd'
import Link from 'next/link'

const A = ({ router, name }) => {
	const [count, setCount] = useState(0)
	const countRef = useRef()
	countRef.current = count

	const handleButtonClick = () => {
		setTimeout(() => {
			alert(countRef.current)
		}, 1000)

	}

	return (
		<div>
			<h1>{count}</h1>
			<div onClick={() => {setCount(count + 1)}}>+1</div>
			<div onClick={handleButtonClick}>点击</div>
      <Link href="#2132">
        <Button>hash触发的事件{name}</Button>
      </Link>
		</div>
	)

}

A.getInitialProps = async () => {
  const promise = new Promise(resolve => {
    setTimeout(() => {
      resolve({
        name: 'asdcxv'
      })
    }, 1000)
  })

  return await promise
}

export default withRouter(A)
