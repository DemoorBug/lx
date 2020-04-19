import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { h0 } from './fp'
import Header from './Header'

import './DeteSelector.css'

// 这个日期选择组件实在是帅的一批，react居然要拆这么细的组件，日期组件原来这么简单，感觉下一次做就不会有所畏惧了，结尾老师说的注意点，什么鬼，听不明白，hide？

function Day(props) {
  const {
    day,
    onSelect
  } = props
  if (!day) {
    return <td className="null"></td>
  }

  const classes = []

  const now = h0()
  if (day < now) {
    classes.push('disabled')
  }

  if ([6, 0].includes(new Date(day).getDay)) {
    classes.push('weekend')
  }
  const dateString = now === day ? '今天' : new Date(day).getDate()

  return (
    <td className={classnames(classes)} onClick={() => onSelect(day)}>
      { dateString }
    </td>
  )
}
Day.propTypes = {
  day: PropTypes.number,
  onSelect: PropTypes.func.isRequired
}


function Week(props) {
  const {
    days,
    onSelect
  } = props
  return (
    <tr className="date-table-days">
      {
        days.map((day, index) => {
          return (
            <Day
              key={index}
              day={day}
              onSelect={onSelect}
            />
          )
        })
      }
    </tr>
  )
}

Week.propTypes = {
  days: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired
}

function Month(props) {
  const {
    startingTimeInMonth,
    onSelect
  } = props
  const startDay = new Date(startingTimeInMonth)
  const currentDay = new Date(startingTimeInMonth)

  let days = []

  while(currentDay.getMonth() === startDay.getMonth()) {
    days.push(currentDay.getTime())
    currentDay.setDate(currentDay.getDate() + 1)
  }
  // 补齐操作,如果是星期天就补 6
  // 还是对js 的方法不熟啊，要控制台看下是干嘛的，fill填入null,然后将数据填到days数组的最后面。so
  days = new Array(startDay.getDay() ? startDay.getDay() -1 : 6)
    .fill(null).concat(days)
  // 后面的补齐
  const lastDay = new Date(days[days.length - 1])
  // 这样写居然就可以添加到数组的前面
  days = days.concat(new Array(lastDay.getDay() ? 7 - lastDay.getDay() : 0).fill(null))

  const weeks = []
  for (let row = 0; row < days.length / 7; ++row) {
    const week = days.slice(row * 7, (row + 1) * 7)
    weeks.push(week)
  }
  return (
    <table className="date-table">
      <thead>
        <tr>
          <td colSpan="7">
            <h5>
              {startDay.getFullYear()}年{startDay.getMonth() + 1}月
            </h5>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr className="data-table-weeks">
          <th>周1</th>
          <th>周2</th>
          <th>周3</th>
          <th>周4</th>
          <th>周5</th>
          <th className="weekend">周6</th>
          <th className="weekend">周7</th>
        </tr>
        {
          weeks.map((week, index) => {
            return (
              <Week
                key={index}
                days={week}
                onSelect={onSelect}
              />
            )
          })
        }
      </tbody>
    </table>
  )
}

Month.propTypes = {
  startingTimeInMonth: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default function DeteSelector(props) {
  const {
    show,
    onSelect,
    onBack
  } = props
  // 获取当前月
  const now = new Date()
  now.setHours(0)
  now.setMinutes(0)
  now.setSeconds(0)
  now.setMilliseconds(0)
  // 设置为这个月的第一天
  now.setDate(1)

  const monthSequence = [now.getTime()]
  // 下个月
  now.setMonth(now.getMonth() + 1)
  // 下个月的0时刻
  monthSequence.push(now.getTime())

  // 再进行一次就是下下个月的，不用担心溢出，一旦跨年，年份的值也会自动加1，所以是安全的
  now.setMonth(now.getMonth() + 1)
  monthSequence.push(now.getTime())

  return (
    <div className={classnames('date-selector', {hidden: !show})}>
      <Header title="日期选择" onBack={onBack} />
      <div className="date-selector-tables">
        {
          monthSequence.map(month => {
            return (
              <Month
                key={month}
                startingTimeInMonth={month}
                onSelect={onSelect}
              />
            )
          })
        }
      </div>
    </div>
  )
}

DeteSelector.propTypes = {
  show: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired
}
