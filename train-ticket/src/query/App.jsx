import React, {
  useCallback,
  useEffect,
  useMemo
} from 'react'
import { connect } from 'react-redux'
import './App.css'

import Header from '../common/Header'
import Nav from '../common/Nav'
import List from './List'
import Bottom from './Bottom'

import URI from 'urijs'
import { h0 } from '../common/fp'
import dayjs from 'dayjs'
import useNav from '../common/useNav'
import {
  bindActionCreators
} from 'redux'

import {
  setFrom,
  setTo,
  setDepartDate,
  setHighSpeed,
  setSearchParsed,

  setTrainList,
  setTicketTypes,
  setTrainTypes,
  setDepartStations,
  setArriveStations,

  prevDate,
  nextDate,

  toggleOrderType,
  toggleHighSpeed,
  toggleOnlyTickets,
  toggleIsFiltersVisible,

  setCheckedTicketTypes,
  setCheckedTrainTypes,
  setCheckedDepartStations,
  setCheckedArriveStatsions,
  setDepartTimeStart,
  setDepartTimeEnd,
  setArriveTimeStart,
  setArriveTimeEnd
} from './actions'

function App(props) {
  const {
    from,
    to,
    dispatch,
    departDate,
    highSpeed,
    searchParsed,
    orderType,
    onlyTickets,
    checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStatsions,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,
    trainList,
    isFiltersVisible,
    ticketTypes,
    trainTypes,
    departStations,
    arriveStations
  } = props

  const onBack = useCallback(() => {
    window.history.back()
  }, [])

  useEffect(() => {
    const query = URI.parseQuery(window.location.search)

    const {
        from,
        to,
        date,
        highSpeed
    } = query

    dispatch(setFrom(from))
    dispatch(setTo(to))
    dispatch(setDepartDate(h0(dayjs(date).valueOf())))
    dispatch(setHighSpeed(highSpeed === 'true'))

    dispatch(setSearchParsed(true))
  }, [dispatch])

  useEffect(() => {
    if (!searchParsed) {
      return
    }
    const url = new URI('/rest/query.json')
      .setSearch('from', from)
      .setSearch('to', to)
      .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
      .setSearch('highSpeed', highSpeed)
      .setSearch('orderType', orderType)
      .setSearch('onlyTickets', onlyTickets)
      .setSearch('checkedTicketTypes', Object.keys(checkedTicketTypes).join())
      .setSearch('checkedTrainTypes', Object.keys(checkedTrainTypes).join())
      .setSearch('checkedDepartStations', Object.keys(checkedDepartStations).join())
      .setSearch('checkedArriveStatsions', Object.keys(checkedArriveStatsions).join())
      .setSearch('departTimeStart', departTimeStart)
      .setSearch('departTimeEnd', departTimeEnd)
      .setSearch('arriveTimeStart', arriveTimeStart)
      .setSearch('arriveTimeEnd', arriveTimeEnd)
      .toString()

    fetch(url)
      .then(response => response.json())
      .then(result => {
        const {
          dataMap: {
            directTrainInfo: {
              trains,
              filter: {
                ticketType,
                trainType,
                depStation,
                arrStation
              }
            }
          }
        } = result

        dispatch(setTrainList(trains))
        dispatch(setTicketTypes(ticketType))
        dispatch(setTrainTypes(trainType))
        dispatch(setDepartStations(depStation))
        dispatch(setArriveStations(arrStation))
      })
    }, [
      dispatch,
      from,
      to,
      departDate,
      highSpeed,
      searchParsed,
      orderType,
      onlyTickets,
      checkedTicketTypes,
      checkedTrainTypes,
      checkedDepartStations,
      checkedArriveStatsions,
      departTimeStart,
      departTimeEnd,
      arriveTimeStart,
      arriveTimeEnd
    ])

    const {
      isPrevDisabled,
      isNextDisabled,
      prey,
      next
    } = useNav(departDate, dispatch, prevDate, nextDate)
    const bottomCbs = useMemo(() => {
      return bindActionCreators({
        toggleOrderType,
        toggleHighSpeed,
        toggleOnlyTickets,
        toggleIsFiltersVisible,
        setCheckedTicketTypes,
        setCheckedTrainTypes,
        setCheckedDepartStations,
        setCheckedArriveStatsions,
        setDepartTimeStart,
        setDepartTimeEnd,
        setArriveTimeStart,
        setArriveTimeEnd,
      }, dispatch)
    }, [dispatch])

    if (!searchParsed) {
      return (
        <div>页面错误</div>
      )
    }
  return (
    <div>
      <div className="header-wrapper">
        <Header
          title={`${from} → ${to}`}
          onBack={onBack}
          />
      </div>
      <Nav
        date={departDate}
        isPrevDisabled={isPrevDisabled}
        isNextDisabled={isNextDisabled}
        prey={prey}
        next={next}
      />
      <List list={trainList}/>
      <Bottom
        {...bottomCbs}
        highSpeed={highSpeed}
        orderType={orderType}
        onlyTickets={onlyTickets}
        isFiltersVisible={isFiltersVisible}
        checkedTicketTypes={checkedTicketTypes}
        checkedTrainTypes={checkedTrainTypes}
        checkedDepartStations={checkedDepartStations}
        checkedArriveStatsions={checkedArriveStatsions}
        departTimeStart={departTimeStart}
        departTimeEnd={departTimeEnd}
        arriveTimeStart={arriveTimeStart}
        arriveTimeEnd={arriveTimeEnd}
        ticketTypes={ticketTypes}
        trainTypes={trainTypes}
        departStations={departStations}
        arriveStations={arriveStations}
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
