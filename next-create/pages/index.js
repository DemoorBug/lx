import { Button } from 'antd'
import { useEffect } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import styled from 'styled-components'
import { connect } from 'react-redux'

const Title = styled.h1`
  color: yellow;
  font-size: 40px;
`

const events = [
  'routeChangeStart',
  'routeChangeComplete',
  'routeChangeError',
  'beforeHistoryChange',
  'hashChangeStart',
  'hashChangeComplete'
]

function makeEvent(type) {
  return (...args) => {
    // console.log(type, ...args)
  }
}

events.forEach(event => {
  Router.events.on(event, makeEvent(event))
})

const Index = (props) => {
  const gotoTestB = () => {
    Router.push({
      pathname: '/b',
      query: {
        id: 'onClick'
      }
    })
  }
  const { count, dispatch } = props
  return (
    <>
      <Title>This is styled-components</Title>
      <Button onClick={gotoTestB}>{count}</Button>
    </>
  )
}

Index.getInitialProps = async ({ reduxStore }) => {
  reduxStore.dispatch({
    type: 'ADD',
    count: 50
  })
  return {}
}

const mapStatrToProps = state => {
  return state.reducer
}

const mapDispatchToProps = dispatch => {
  return { dispatch }
}

export default connect(mapStatrToProps, mapDispatchToProps)(Index)
