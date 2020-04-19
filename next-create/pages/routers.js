import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'

// Current URL is '/'
function Page(props) {
  const router = useRouter()
  const [counts, setCount] = useState(0)
  const count = useRef(counts)
  console.log(props.page);
  useEffect(() => {
    // Always do navigations after the first render
    console.log(count.current + 1);
    router.push(`/routers?`, '/routers', { shallow: true })
  }, [])

  useEffect(() => {
    console.log('刷新');
  }, [router.query.counter])
  return <div>{counts}</div>
}

 Page.getInitialProps = async (ctx) => {
   return {page: 0}
 }

const mapStatrToProps = state => (
  state
)

export default connect(mapStatrToProps)(Page)
