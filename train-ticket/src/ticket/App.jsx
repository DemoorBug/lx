import React, {
  useEffect,
  useCallback,
  useState,
  useMemo,
  lazy,
  Suspense
} from 'react'
import { connect } from 'react-redux'
import './App.css'
import { bindActionCreators } from 'redux'

import {
  TrainContext
} from './context.js'

import {
  h0
} from '../common/fp'
import dayjs from 'dayjs'
import URI from 'urijs'
import useNav from '../common/useNav'

import Detail from '../common/Detail.jsx'
import Header from '../common/Header.jsx'
import Nav from '../common/Nav.jsx'

import Candidate from './Candidate.jsx'
// import Schedule from './Schedule.jsx'


import {
  setDepartStation,
  setArriveStation,
  setTrainNumber,
  setDepartDate,
  setSearchParsed,
  prevDate,
  nextDate,

  setDepartTimeStr,
  setArriveTimeStr,
  setArriveDate,
  setDurationStr,
  setTickets,

  toggleIsScheduleVisible
} from './actions'

// 异步引入
const Schedule = lazy(() => import('./Schedule.jsx'))

function App(props) {
  const {
    departDate,
    arriveDate,
    departTimeStr,
    arriveTimeStr,
    departStation,
    arriveStation,
    trainNumber,
    durationStr,
    tickets,
    isScheduleVisible,
    searchParsed,
    dispatch
  } = props

  const [isLoad, setIsLoad] = useState(false)

  useEffect(() => {
    const query = URI.parseQuery(window.location.search)
    const {
      aStation,
      dStation,
      trainNumber,
      date
    } = query
    dispatch(setDepartStation(aStation))
    dispatch(setArriveStation(dStation))
    dispatch(setTrainNumber(trainNumber))
    dispatch(setDepartDate( h0(dayjs(date).valueOf() ) ) )
    dispatch(setSearchParsed(true))
  }, [dispatch])

  useEffect(() => {
    document.title = trainNumber
  }, [trainNumber])

  useEffect(() => {
      if (!searchParsed) {
        return
      }
      const url = new URI('/rest/ticket.json')
        .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
        .setSearch('trainNumber', trainNumber)
        .toString()
      fetch(url)
        .then(res => res.json())
        .then(result => {
          const {
            datail: {
              departTimeStr,
              arriveTimeStr,
              arriveDate,
              durationStr
            },
            candidates
          } = result
          dispatch(setDepartTimeStr(departTimeStr))
          dispatch(setArriveTimeStr(arriveTimeStr))
          dispatch(setArriveDate(arriveDate))
          dispatch(setDurationStr(durationStr))
          dispatch(setTickets(candidates))
          setIsLoad(true)
        })
  }, [searchParsed, departDate, trainNumber, dispatch])

  const onBack = useCallback(() => {
    window.history.back()
  }, [])

  const {
    isPrevDisabled,
    isNextDisabled,
    prey,
    next,
  } = useNav(departDate, dispatch, prevDate, nextDate)
  const detailCbs = useMemo(() => {
    return bindActionCreators({
      toggleIsScheduleVisible
    }, dispatch)
  }, [dispatch])

  if (!searchParsed) {
    return null
  }
  return (
    <div className="app">
      <div className="header-wrapper">
        <Header
          title={trainNumber}
          onBack={onBack}
          />
      </div>
      <div className="nav-wrapper">
        <Nav
          date={departDate}
          isPrevDisabled={isPrevDisabled}
          isNextDisabled={isNextDisabled}
          prey={prey}
          next={next}
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
              {...detailCbs}
            >
              <span className="left"></span>
              <span className="schedule" onClick={() => detailCbs.toggleIsScheduleVisible()}>时刻表</span>
              <span className="right"></span>
            </Detail>
        }
      </div>
      <TrainContext.Provider value={{trainNumber, departStation, arriveStation, departDate}}>
        <Candidate tickets={tickets}/>
      </TrainContext.Provider>
      {
        isScheduleVisible &&
          <div className="mask" onClick={() => dispatch(toggleIsScheduleVisible())}>
            <Suspense fallback={<div>...loading</div>}>
              <Schedule
                date={departDate}
                trainNumber={trainNumber}
                departStation={departStation}
                arriveStation={arriveStation}
                />
            </Suspense>
          </div>
      }
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
