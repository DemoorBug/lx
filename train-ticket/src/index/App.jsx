import React, { useCallback, useMemo } from 'react'
import { connect } from 'react-redux'
import './App.css'
import { h0 } from '../common/fp'

import Header from '../common/Header.jsx'
import DepartDate from './DepartDate.jsx'
import HighSpeed from './HighSpeed.jsx'
import Journey from './Journey.jsx'
import Sublime from './Sublime.jsx'

import CitySelector from '../common/CitySelector.jsx'
import DeteSelector from '../common/DeteSelector.jsx'

import {
  bindActionCreators
} from 'redux'

import {
  exchangeFromTo,
  showCitySelector,
  hideCitySelector,
  fetchCityData,
  setSelectedCity,
  showDateSelector,
  hideDateSelector,
  setDepartDate,
  toggleHighSpeed
} from './actions.js'

function App(props) {
  const {
    to,
    from,
    dispatch,
    isCitySelectorVisible,
    isDateSelectorVisible,
    cityData,
    isLoadingCityData,
    departDate,
    highSpeed
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

  const departDateCbs = useMemo(() => {
    return bindActionCreators({
      onClick: showDateSelector
    }, dispatch)
  }, [dispatch])

  const dateSelectorCbs = useMemo(() => {
    return bindActionCreators({
      onBack: hideDateSelector
    }, dispatch)
  }, [dispatch])

  const HighSpeedCbs = useMemo(() => {
    return bindActionCreators({
      toggle: toggleHighSpeed
    }, dispatch)
  }, [dispatch])
  const h0Time = h0(Date.now())

  const nowTime = useMemo(() => {
    return h0Time
  }, [h0Time])

  const onSelectDate = useCallback((day) => {
    if (!day) {
      return;
    }
    if (day < h0()) {
      return;
    }
    dispatch(setDepartDate(day));
    dispatch(hideDateSelector())
  }, [dispatch])
  return (
    <div>
      <div className="header-wrapper">
        <Header title="火车票" onBack={onBack}/>
      </div>
      <form action="./query.html" className="form">
        <Journey
          to={to}
          from={from}
          {...cbs}
          />
        <DepartDate
          time={departDate}
          nowTime={nowTime}
          { ...departDateCbs }
        />
        <HighSpeed
          highSpeed={highSpeed}
          {...HighSpeedCbs}
        />
        <Sublime />
      </form>
      <CitySelector
        show={isCitySelectorVisible}
        cityData={cityData}
        isLoading={isLoadingCityData}
        {...citySelectorCbs}
      />
      <DeteSelector
        show={isDateSelectorVisible}
        {...dateSelectorCbs}
        onSelect={onSelectDate}
      />
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
