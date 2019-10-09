export const ACTION_SET_TRAIN_NUMBER = 'SET_TRAIN_NUMBER'
export const ACTION_SET_DEPART_STATION = 'SET_DEPART_STATION'
export const ACTION_SET_ARRIVE_STATION = 'SET_ARRIVE_STATION'
export const ACTION_SET_SEAT_TYPE = 'SET_SEAT_TYPE'
export const ACTION_SET_DEPART_DATE = 'SET_DEPART_DATE'
export const ACTION_SET_ARRIVE_DATE = 'SET_ARRIVE_DATE'
export const ACTION_SET_DEPART_TIME_STR = 'SET_DEPART_TIME_STR'
export const ACTION_SET_ARRIVE_TIME_STR = 'SET_ARRIVE_TIME_STR'
export const ACTION_SET_DURATION_STR = 'SET_DURATION_STR'
export const ACTION_SET_PRICE = 'SET_PRICE'
export const ACTION_SET_PASSENGERS = 'SET_PASSENGERS'
export const ACTION_SET_MENU = 'SET_MENU'
export const ACTION_SET_IS_MENU_VISIBLE = 'SET_IS_MENU_VISIBLE'
export const ACTION_SET_SEARCH_PARSED = 'SET_SEARCH_PARSED'
export const ACTION_SET_IS_LOAD = 'SET_IS_LOAD'

export function setTrainNumber(trainNumber){
  return {
    type: ACTION_SET_TRAIN_NUMBER,
    payload: trainNumber
  }
}
export function setDepartStation(departStation){
  return {
    type: ACTION_SET_DEPART_STATION,
    payload: departStation
  }
}
export function setArriveStation(arriveStation){
  return {
    type: ACTION_SET_ARRIVE_STATION,
    payload: arriveStation
  }
}
export function setSeatType(seatType){
  return {
    type: ACTION_SET_SEAT_TYPE,
    payload: seatType
  }
}
export function setDepartDate(departDate){
  return {
    type: ACTION_SET_DEPART_DATE,
    payload: departDate
  }
}
export function setArriveDate(arriveDate){
  return {
    type: ACTION_SET_ARRIVE_DATE,
    payload: arriveDate
  }
}
export function setDepartTimeStr(departTimeStr){
  return {
    type: ACTION_SET_DEPART_TIME_STR,
    payload: departTimeStr
  }
}
export function setArriveTimeStr(arriveTimeStr){
  return {
    type: ACTION_SET_ARRIVE_TIME_STR,
    payload: arriveTimeStr
  }
}
export function setDurationStr(durationStr){
  return {
    type: ACTION_SET_DURATION_STR,
    payload: durationStr
  }
}
export function setPrice(price){
  return {
    type: ACTION_SET_PRICE,
    payload: price
  }
}
export function setPassengers(passengers){
  return {
    type: ACTION_SET_PASSENGERS,
    payload: passengers
  }
}
export function setMenu(menu){
  return {
    type: ACTION_SET_MENU,
    payload: menu
  }
}
export function setIsMenuVisible(isMenuVisible){
  return {
    type: ACTION_SET_IS_MENU_VISIBLE,
    payload: isMenuVisible
  }
}
export function toggleIsMenuVisible() {
  return (dispatch, getState) => {
    const { isMenuVisible } = getState()
    dispatch(setIsMenuVisible(!isMenuVisible))
  }
}
export function setSearchParsed(searchParsed){
  return {
    type: ACTION_SET_SEARCH_PARSED,
    payload: searchParsed
  }
}
export function setIsLoad(isLoad){
  return {
    type: ACTION_SET_IS_LOAD,
    payload: isLoad
  }
}
export function fetchInitial(url) {
  return (dispatch, getState) => {
    fetch(url)
      .then(async res => {
        const {
          departTimeStr,
          arriveTimeStr,
          arriveDate,
          durationStr,
          price
        } = await res.json()

        dispatch(setDepartTimeStr(departTimeStr))
        dispatch(setArriveTimeStr(arriveTimeStr))
        dispatch(setArriveDate(Number(arriveDate)))
        dispatch(setDurationStr(durationStr))
        dispatch(setPrice(price))
        dispatch(setIsLoad(true))

      })
  }
}
let passengerIdSeed = 0

export function createAdult() {
  return (dispatch, getState) => {
    const { passengers } = getState()

    // 如果有未填写字段，则直接返回，挺厉害的啊。这个得研究一下
    for (let passenger of passengers) {
      const keys = Object.keys(passenger)
      for (let key of keys) {
        if (!passenger[key]) {
          return
        }
      }
    }

    dispatch(setPassengers([
      ...passengers,
      {
        id: ++passengerIdSeed,
        name: '',
        ticketType: 'adult',
        licenceNo: '',
        seat: 'Z'
      }
    ]))
  }
}

export function createChild() {
  return (dispatch, getState) => {
    const { passengers } = getState()
    // 研究完成了，就那些东西，以前都搞过，久了没搞生疏了
    // console.error('这里明天研究，扛不住了，研究完在进行下一节，并且做笔记');
    let adultFound = null

    for (let passenger of passengers) {
      const keys = Object.keys(passenger)
      for (let key of keys) {
        if (!passenger[key]) {
          return
        }
      }
      if (passenger.ticketType === 'adult') {
        adultFound = passenger.id
      }
    }
    if (!adultFound) {
      alert('请正确添加一个同行成人')
      return
    }

    dispatch(setPassengers([
      ...passengers,
      {
        id: ++passengerIdSeed,
        gender: 'none',
        birthday: '',
        followAdult: adultFound,
        name: '',
        ticketType: 'child',
        seat: 'Z'
      }
    ]))
  }
}
export function onRemove(id) {
  return (dispatch, getState) => {
    const { passengers } = getState()
    const remove = passengers.filter(passenger => {
      // 第二个判断条件是，如果成人被删除，儿童也要被删除
      return passenger.id !== id && passenger.followAdult !== id
    })
    console.log(remove);
    dispatch(setPassengers(remove))
  }
}
export function onUpdate(id, data) {
  return (dispatch, getState) => {
    const { passengers } = getState()
    // const newPassengers = passengers.find(passenger => {
    //   return passenger.id !== id
    // })
    // dispatch(setPassengers(newPassengers))
    for (let i = 0; i < passengers.length; ++i) {
      if (passengers[i].id === id) {
        // 这里必须浅拷贝一份，严格来说要深拷贝的，为什么不提呢，还是说不重要?
        const newPassengers = [...passengers]
        // newPassengers[i].name = name
        // 换一种逼格高的写法
        // 要写这种通用组件，必须这么写，而不是高逼格，上面描述有误
        newPassengers[i] = Object.assign({}, passengers[i], data)
        // 另一种写法：
        // newPassengers[i] = {...passengers[i], ...data}
        // console.log(newPassengers);
        dispatch(setPassengers(newPassengers))
        break
      }
    }
  }
}
