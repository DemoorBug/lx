import React, {
  memo,
  useState,
  useMemo,
  useReducer
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { ORDER_DEPART } from './constant';
import './Bottom.css';

import Slider from './Slider.jsx'

function checkedReducer(state, action){
  const { type, payload } = action
  switch (type) {
    case 'reset':
      return {}
    case 'toggle':
      const newState = {...state}
      if (payload in newState) {
        delete newState[payload]
      } else {
        newState[payload] = true
      }
      return newState
    default:
  }
  return state
}

const Filter = memo(function (props) {
  const {
    name,
    checked,
    dispatch,
    index
  } = props
  return (
    <li className={classnames({checked})} onClick={() => dispatch({payload:index, type:'toggle'})}>
      { name }
    </li>
  )
})

Filter.props = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
}

const Option = memo(function (props){
  const {
    title,
    options,
    checkedMap,
    dispatch
  } = props
  // 用useReducer 做统一数据流更改
  // const toggle = useCallback((value) => {
  //   const newCheckedMap = {...checkedMap}
  //   if (value in checkedMap) {
  //     delete newCheckedMap[value]
  //   } else {
  //     newCheckedMap[value] = true
  //   }
  //   update(newCheckedMap)
  // }, [checkedMap, update])

  return (
    <div className="option">
      <h3>{title}</h3>
      <ul>
        {
          options.map((option, index) => {
            return (
              <Filter
                {...option}
                checked={index in checkedMap}
                key={option.value}
                dispatch={dispatch}
                index={index}
              />
            )
          })
        }
      </ul>
    </div>
  )
})

Option.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  checkedMap: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

const BottomModal = memo(function (props) {
  const {
    checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStatsions,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,
    ticketTypes,
    trainTypes,
    departStations,
    arriveStations,
    setCheckedTicketTypes,
    setCheckedTrainTypes,
    setCheckedDepartStations,
    setCheckedArriveStatsions,
    setDepartTimeStart,
    setDepartTimeEnd,
    setArriveTimeStart,
    setArriveTimeEnd,
    toggleIsFiltersVisible,
  } = props

  const [localDepartTimeStart, setLocalDepartTimeStart] = useState(departTimeStart);
  const [localDepartTimeEnd, setLocalDepartTimeEnd] = useState(departTimeEnd);
  const [localArriveTimeStart, setLocalArriveTimeStart] = useState(arriveTimeStart);
  const [localArriveTimeEnd, setLocalArriveTimeEnd] = useState(arriveTimeEnd);

  const [localCheckedTicketTypes, LocalCheckedTicketTypesDispatch] = useReducer(checkedReducer, checkedTicketTypes,(checkedTicketTypes) => {
    return {...checkedTicketTypes}
  })
  const [localCheckedTrainTypes, LoCalcheckedTrainTypesDispatch] = useReducer(checkedReducer, checkedTrainTypes,(checkedTrainTypes) => {
    return {...checkedTrainTypes}
  })
  const [localCheckedDepartStations, LocalCheckedDepartStationsDispatch] = useReducer(checkedReducer, checkedDepartStations,(checkedDepartStations) => {
    return {...checkedDepartStations}
  })
  const [localCheckedArriveStatsions, LocalCheckedArriveStatsionsDispatch] = useReducer(checkedReducer, checkedArriveStatsions,(checkedArriveStatsions) => {
    return {...checkedArriveStatsions}
  })
  const optionGroup = [
    {
      title: '坐席类型',
      options: ticketTypes,
      checkedMap: localCheckedTicketTypes,
      dispatch: LocalCheckedTicketTypesDispatch
    },
    {
      title: '车次类型',
      options: trainTypes,
      checkedMap: localCheckedTrainTypes,
      dispatch: LoCalcheckedTrainTypesDispatch
    },
    {
      title: '出发车站',
      options: departStations,
      checkedMap: localCheckedDepartStations,
      dispatch: LocalCheckedDepartStationsDispatch
    },
    {
      title: '到达车站',
      options: arriveStations,
      checkedMap: localCheckedArriveStatsions,
      dispatch: LocalCheckedArriveStatsionsDispatch
    }
  ]

  function sure() {
    setCheckedTicketTypes(localCheckedTicketTypes)
    setCheckedTrainTypes(localCheckedTrainTypes)
    setCheckedDepartStations(localCheckedDepartStations)
    setCheckedArriveStatsions(localCheckedArriveStatsions)

    setDepartTimeStart(localDepartTimeStart)
    setDepartTimeEnd(localDepartTimeEnd)
    setArriveTimeStart(localArriveTimeStart)
    setArriveTimeEnd(localArriveTimeEnd)

    toggleIsFiltersVisible()
  }

  const isResetDisabled = useMemo(() => {
    return  Object.keys(localCheckedTicketTypes).length === 0
    && Object.keys(localCheckedTrainTypes).length === 0
    && Object.keys(localCheckedDepartStations).length === 0
    && Object.keys(localCheckedArriveStatsions).length === 0
    && localDepartTimeStart === 0
    && localDepartTimeEnd === 24
    && localArriveTimeStart === 0
    && localArriveTimeEnd === 24
  }, [
    localCheckedTicketTypes,
    localCheckedTrainTypes,
    localCheckedDepartStations,
    localCheckedArriveStatsions,
    localDepartTimeStart,
    localDepartTimeEnd,
    localArriveTimeStart,
    localArriveTimeEnd,
  ])
  const [reload, setReload] = useState(0)
  function reset(){
    LocalCheckedTicketTypesDispatch({type: 'reset'})
    LoCalcheckedTrainTypesDispatch({type: 'reset'})
    LocalCheckedDepartStationsDispatch({type: 'reset'})
    LocalCheckedArriveStatsionsDispatch({type: 'reset'})

    setLocalDepartTimeStart(0)
    setLocalDepartTimeEnd(24)
    setLocalArriveTimeStart(0)
    setLocalArriveTimeEnd(24)
    setReload(load => load + 1)
  }
  return (
    <div className="bottom-modal">
      <div className="bottom-dialog">
        <div className="bottom-dialog-content">
          <div className="title">
            <span
              className={classnames('reset', {
                disabled: isResetDisabled
              })}
              onClick={reset}
            >重置</span>
            <span className="ok" onClick={sure}>确定</span>
          </div>
          <div className="options">
            {
              optionGroup.map(group => {
                return (
                  <Option
                    {...group}
                    key={group.title}
                    />
                )
              })
            }
          </div>
          <Slider
            title="出发时间"
            currentStartHours={localDepartTimeStart}
            currentEndHours={localDepartTimeEnd}
            onStartChanged={setLocalDepartTimeStart}
            onEndChanged={setLocalDepartTimeEnd}
            reload={reload}
          />
          <Slider
              title="到达时间"
              currentStartHours={localArriveTimeStart}
              currentEndHours={localArriveTimeEnd}
              onStartChanged={setLocalArriveTimeStart}
              onEndChanged={setLocalArriveTimeEnd}
              reload={reload}
          />
        </div>
      </div>
    </div>
  )
})

BottomModal.propTypes = {
  checkedTicketTypes: PropTypes.object.isRequired,
  checkedTrainTypes: PropTypes.object.isRequired,
  checkedDepartStations: PropTypes.object.isRequired,
  checkedArriveStatsions: PropTypes.object.isRequired,
  departTimeStart: PropTypes.number.isRequired,
  departTimeEnd: PropTypes.number.isRequired,
  arriveTimeStart: PropTypes.number.isRequired,
  arriveTimeEnd: PropTypes.number.isRequired,
  ticketTypes: PropTypes.array.isRequired,
  trainTypes: PropTypes.array.isRequired,
  departStations: PropTypes.array.isRequired,
  arriveStations: PropTypes.array.isRequired,
  setCheckedTicketTypes: PropTypes.func.isRequired,
  setCheckedTrainTypes: PropTypes.func.isRequired,
  setCheckedDepartStations: PropTypes.func.isRequired,
  setCheckedArriveStatsions: PropTypes.func.isRequired,
  setDepartTimeStart: PropTypes.func.isRequired,
  setDepartTimeEnd: PropTypes.func.isRequired,
  setArriveTimeStart: PropTypes.func.isRequired,
  setArriveTimeEnd: PropTypes.func.isRequired,
  toggleIsFiltersVisible: PropTypes.func.isRequired,
}

export default function Bottom(props) {
    const {
        toggleOrderType,
        toggleHighSpeed,
        toggleOnlyTickets,
        toggleIsFiltersVisible,
        highSpeed,
        orderType,
        onlyTickets,
        isFiltersVisible,
        checkedTicketTypes,
        checkedTrainTypes,
        checkedDepartStations,
        checkedArriveStatsions,
        departTimeStart,
        departTimeEnd,
        arriveTimeStart,
        arriveTimeEnd,
        ticketTypes,
        trainTypes,
        departStations,
        arriveStations,
        setCheckedTicketTypes,
        setCheckedTrainTypes,
        setCheckedDepartStations,
        setCheckedArriveStatsions,
        setDepartTimeStart,
        setDepartTimeEnd,
        setArriveTimeStart,
        setArriveTimeEnd,
    } = props;

    const noChecked = useMemo(() => {
      return  Object.keys(checkedTicketTypes).length === 0
      && Object.keys(checkedTrainTypes).length === 0
      && Object.keys(checkedDepartStations).length === 0
      && Object.keys(checkedArriveStatsions).length === 0
      && departTimeStart === 0
      && departTimeEnd === 24
      && arriveTimeStart === 0
      && arriveTimeEnd === 24
    }, [
      checkedTicketTypes,
      checkedTrainTypes,
      checkedDepartStations,
      checkedArriveStatsions,
      departTimeStart,
      departTimeEnd,
      arriveTimeStart,
      arriveTimeEnd,
    ])

    return (
        <div className="bottom">
            <div className="bottom-filters">
                <span className="item" onClick={toggleOrderType}>
                    <i className="icon">&#xf065;</i>
                    { orderType === ORDER_DEPART ? '出发 早→晚' : '耗时 短→长' }
                </span>
                <span
                    className={classnames('item', {'item-on': highSpeed})}
                    onClick={toggleHighSpeed}
                >
                    <i className="icon">{ highSpeed ? '\uf43f' : '\uf43e' }</i>
                    只看高铁动车
                </span>
                <span
                    className={classnames('item', {'item-on': onlyTickets})}
                    onClick={toggleOnlyTickets}
                >
                    <i className="icon">{ onlyTickets ? '\uf43d' : '\uf43c' }</i>
                    只看有票
                </span>
                <span
                    className={classnames('item', {'item-on': isFiltersVisible || !noChecked })}
                    onClick={toggleIsFiltersVisible}
                >
                    <i className="icon">{ noChecked ? '\uf0f7' : '\uf446' }</i>
                    综合筛选
                </span>
            </div>
            {
              isFiltersVisible && (
                <BottomModal
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
                  setCheckedTicketTypes={setCheckedTicketTypes}
                  setCheckedTrainTypes={setCheckedTrainTypes}
                  setCheckedDepartStations={setCheckedDepartStations}
                  setCheckedArriveStatsions={setCheckedArriveStatsions}
                  setDepartTimeStart={setDepartTimeStart}
                  setDepartTimeEnd={setDepartTimeEnd}
                  setArriveTimeStart={setArriveTimeStart}
                  setArriveTimeEnd={setArriveTimeEnd}
                  toggleIsFiltersVisible={toggleIsFiltersVisible}
                />
              )
            }
        </div>
    );
}

Bottom.propTypes = {
    toggleOrderType: PropTypes.func.isRequired,
    toggleHighSpeed: PropTypes.func.isRequired,
    toggleOnlyTickets: PropTypes.func.isRequired,
    toggleIsFiltersVisible: PropTypes.func.isRequired,
    highSpeed: PropTypes.bool.isRequired,
    orderType: PropTypes.number.isRequired,
    onlyTickets: PropTypes.bool.isRequired,
    isFiltersVisible: PropTypes.bool.isRequired,

    checkedTicketTypes: PropTypes.object.isRequired,
    checkedTrainTypes: PropTypes.object.isRequired,
    checkedDepartStations: PropTypes.object.isRequired,
    checkedArriveStatsions: PropTypes.object.isRequired,
    departTimeStart: PropTypes.number.isRequired,
    departTimeEnd: PropTypes.number.isRequired,
    arriveTimeStart: PropTypes.number.isRequired,
    arriveTimeEnd: PropTypes.number.isRequired,
    ticketTypes: PropTypes.array.isRequired,
    trainTypes: PropTypes.array.isRequired,
    departStations: PropTypes.array.isRequired,
    arriveStations: PropTypes.array.isRequired,
    setCheckedTicketTypes: PropTypes.func.isRequired,
    setCheckedTrainTypes: PropTypes.func.isRequired,
    setCheckedDepartStations: PropTypes.func.isRequired,
    setCheckedArriveStatsions: PropTypes.func.isRequired,
    setDepartTimeStart: PropTypes.func.isRequired,
    setDepartTimeEnd: PropTypes.func.isRequired,
    setArriveTimeStart: PropTypes.func.isRequired,
    setArriveTimeEnd: PropTypes.func.isRequired,
};
