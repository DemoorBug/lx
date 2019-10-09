import React, {
  useCallback,
  useEffect,
  useMemo
} from 'react'
import URI from 'urijs'
import { connect } from 'react-redux'
import './App.css'
import dayjs from 'dayjs'

import { bindActionCreators } from 'redux'

import Header from '../common/Header.jsx'
import Detail from '../common/Detail.jsx'
import Account from './Account.jsx'
import Choose from './Choose.jsx'
import Passengers from './Passengers.jsx'
import Ticket from './Ticket.jsx'

import {
  setDepartStation,
  setArriveStation,
  setTrainNumber,
  setSeatType,
  setDepartDate,
  setSearchParsed,
  fetchInitial,
  createAdult,
  createChild,
  onRemove,
  onUpdate
} from './actions'

function App(props) {
  const {
    trainNumber,
    departStation,
    arriveStation,
    seatType,
    departDate,
    arriveDate,
    departTimeStr,
    arriveTimeStr,
    durationStr,
    price,
    passengers,
    menu,
    isMenuVisible,
    searchParsed,
    dispatch,
    isLoad
  } = props

  useEffect(() => {
    const queries = URI.parseQuery(window.location.search)
    const {
      trainNumber,
      dStation,
      aStation,
      type,
      date
    } = queries
    dispatch(setDepartStation(dStation))
    dispatch(setArriveStation(aStation))
    dispatch(setTrainNumber(trainNumber))
    dispatch(setSeatType(type))
    dispatch(setDepartDate(dayjs(date).valueOf()))
    dispatch(setSearchParsed(true))

  }, [])


  useEffect(() => {
    if (!searchParsed) {
      return
    }
    const url = new URI('/rest/order.json')
      .setSearch('dStation', departStation)
      .setSearch('aStation', arriveStation)
      .setSearch('type', seatType)
      .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
      .toString()

    dispatch(fetchInitial(url))
  }, [
    searchParsed,
    departStation,
    arriveStation,
    seatType,
    departDate,
    dispatch
  ])
  const passengersCbs = useMemo(() => {
    return bindActionCreators({
      createAdult,
      createChild,
      onRemove,
      onUpdate
    }, dispatch)
  }, [dispatch])

  const onBack = useCallback(() => {
    window.history.back()
  }, [])

  if (!searchParsed) {
    return null
  }

  return (
    <div className="app">
      <div className="header-wrapper">
        <Header
          title="订单填写"
          onBack={onBack}
        />
      </div>
      <div className="detail-wrapper">
        {
          isLoad &&
            <Detail
              departDate={departDate}
              arriveDate={arriveDate}
              departTimeStr={departTimeStr}
              arriveTimeStr={arriveTimeStr}
              trainNumber={trainNumber}
              departStation={departStation}
              arriveStation={arriveStation}
              durationStr={durationStr}
            >
              <span
                style={{
                  display: 'block'
                }}
                className="train-icon"
              ></span>
            </Detail>
        }
      </div>
      <Ticket
        price={price}
        type={seatType}
      />
    <Passengers
      passengers={passengers}
      {...passengersCbs}
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
