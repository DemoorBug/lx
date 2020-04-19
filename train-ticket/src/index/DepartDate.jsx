import React, {
  useMemo,
  memo
} from 'react'
import PropTypes from 'prop-types'
import { h0 } from '../common/fp'
import dayjs from 'dayjs'
import './DepartDate.css'

// 为什么没有用memo优化呢，是因为这里面使用到了不加参数的h0()，没有经过props，
// 不加参数的h0是直接从系统上获取到的，这是另一个数据的获取途径
// 输入并不单纯，用memo来优化是有风险的，就是该重渲染的时候没有重渲染，对于-
// 我们这个组件来说只有跨越0点才会有问题
// 如何规避这个问题，就是把当前的时间戳用props传进来，so,原来是这样啊，得一句一句-
// 理解


const DepartDate = memo(function DepartDate(props) {
  const {
    time,
    onClick,
    nowTime
  } = props

  const h0OfDepart = h0(time)
  const departDate = new Date(h0OfDepart)

  const departDateString = useMemo(() => {
    return dayjs(h0OfDepart).format('YYYY-MM-DD')
  }, [h0OfDepart])

  const isToday = h0OfDepart === h0(nowTime)
  const weekString = '周'
    + ['日','一','二','三','四','五','六'][departDate.getDay()]
    + (isToday ? '(今天)' : '')

  return (
    <div className="depart-date" onClick={onClick}>
      <input type="hidden" name="date" value={departDateString}/>
      { departDateString } <span className="depart-week">{weekString}</span>
    </div>
  )
})

DepartDate.propTypes = {
  time: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  nowTime: PropTypes.number.isRequired
}

export default DepartDate
