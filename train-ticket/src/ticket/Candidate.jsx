import React, {
  memo,
  useCallback,
  useMemo,
  useState,
  useContext
} from 'react'
import PropTypes from 'prop-types'
import './Candidate.css'
import URI from 'urijs'
import dayjs from 'dayjs'
import {
  TrainContext
} from './context.js'


const Channel = memo(function (props){
  const {
    name,
    desc,
    type
  } = props
  const {
    trainNumber, departStation, arriveStation, departDate
  } = useContext(TrainContext)
  const src = useMemo(() => {
    return new URI('order.html')
      .setSearch('trainNumber', trainNumber)
      .setSearch('dStation', departStation)
      .setSearch('aStation', arriveStation)
      .setSearch('type', type)
      .setSearch('data', dayjs(departDate).format('YYYY-MM-DD'))
      .toString()
  }, [
    trainNumber,
    departStation,
    arriveStation,
    type,
    departDate,
  ])

  return (
    <div className="channel">
      <div className="middle">
        <div className="name">{ name }</div>
        <div className="desc">{ desc }</div>
      </div>
      <a href={src} className="buy-wrapper">
        <div className="buy">买票</div>
      </a>
    </div>
  )
})

const Seat = memo(function (props) {
  const {
    type,
    priceMsg,
    ticketsLeft,
    channels,
    index,
    expanded,
    toggleExpanded
  } = props

  return (
    <li>
      <div className="bar" onClick={() => toggleExpanded(index)}>
        <span className="seat">{ type }</span>
        <span className="price">
          <i>￥</i>
          { priceMsg }
        </span>
        <span className="btn">{expanded ? '预定':'收起'}</span>
        <span className="num">{ ticketsLeft }</span>
      </div>
      <div
        className="channels"
        style={{height: expanded ? channels.length * 55 + 'px' : 0}}
      >
        {
          channels.map(channel => {
            return <Channel key={channel.name} {...channel} type={type}/>
          })
        }
      </div>
    </li>
  )
})

Seat.propTypes = {
  type: PropTypes.string.isRequired,
  priceMsg: PropTypes.string.isRequired,
  ticketsLeft: PropTypes.string.isRequired,
  channels: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
}

const Candidate = memo(function Candidate(props){
  const {
    tickets
  } = props
  const [expanded, setExpanded] = useState(-1)

  const toggleExpanded = useCallback((index) => {
    setExpanded(index === expanded ? false : index)
  }, [expanded])

  return (
    <div className="candidate">
      <ul>
        {
          tickets.map((ticket, index) => {
            return (
              <Seat
                {...ticket}
                key={ticket.type}
                index={index}
                expanded={expanded === index}
                toggleExpanded={toggleExpanded}
              />
            )
          })
        }
      </ul>
    </div>
  )
})

Candidate.propTypes = {
  tickets: PropTypes.array.isRequired
}

export default Candidate
