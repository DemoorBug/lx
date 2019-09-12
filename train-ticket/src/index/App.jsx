import React, { useCallback, useMemo } from 'react'
import { connect } from 'react-redux'
import './App.css'

import Header from '../common/Header.jsx'
import DepartDate from './DepartDate.jsx'
import HighSpeed from './HighSpeed.jsx'
import Journey from './Journey.jsx'
import Sublime from './Sublime.jsx'
import CitySelector from '../common/CitySelector.jsx'

import {
  bindActionCreators
} from 'redux'

import {
  exchangeFromTo,
  showCitySelector,
  hideCitySelector,
  fetchCityData,
  setSelectedCity
} from './actions.js'

function App(props) {
  const {
    to,
    from,
    dispatch,
    isCitySelectorVisible,
    cityData,
    isLoadingCityData
  } = props

  const onBack = useCallback(() => {
    window.history.back()
  }, [])
  // 这里可以用useMemo合并这些callback
  // const doExchangeFromTo = useCallback(() => {
  //   dispatch(exchangeFromTo())
  // }, [])
  // const doShowCitySelector = useCallback(() => {
  //   dispatch(showCitySelector())
  // }, [])
  // exchangeFromTo={doExchangeFromTo}
  // showCitySelector={doShowCitySelector}

  // useMemo合并
  const cbs = useMemo(() => {
    return bindActionCreators({
      exchangeFromTo,
      showCitySelector
    }, dispatch)
  }, [dispatch])

  const citySelectorCbs = useMemo(() => {
    return bindActionCreators({
      hideCitySelector,
      fetchCityData,
      onSelect: setSelectedCity 
    }, dispatch)
  }, [dispatch])
  return (
    <div>
      <div className="header-wrapper">
        <Header title="火车票" onBack={onBack}/>
      </div>
      <form action="/" className="form">
        <Journey
          to={to}
          from={from}
          {...cbs}
          />
        <DepartDate />
        <HighSpeed />
        <Sublime />
        <CitySelector
          show={isCitySelectorVisible}
          cityData={cityData}
          isLoading={isLoadingCityData}
          {...citySelectorCbs}
        />
      </form>
    </div>
  )
}

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
