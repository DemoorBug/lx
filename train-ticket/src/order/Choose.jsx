import React, {
  memo,
  useCallback
} from 'react'
import PropTypes from 'prop-types'
import './Choose.css'
import classnames from 'classnames';

const Choose = memo(function Choose (props) {
  const {
    passengers,
    onUpdate
  } = props
  const createSeat = useCallback((seatType) => {
    return (
      <div>
        {
          passengers.map(passenger => {
            return (
              <p
                key={passenger.id}
                className={classnames('seat', {
                  active: passenger.seat === seatType
                })}
                data-text={seatType}
                onClick={() => onUpdate(passenger.id, {
                  seat: seatType
                })}
              >
                &#xe02d;
              </p>
            )
          })
        }
      </div>
    )
  }, [passengers, onUpdate])

  return (
    <div className='choose'>
      <p className="tip">在线选座</p>
      <div className="container">
        <div className="seats">
          <div>窗</div>
          { createSeat('A') }
          { createSeat('B') }
          { createSeat('C') }
          <div>过道</div>
          { createSeat('D') }
          <div>窗</div>
          { createSeat('E') }
        </div>
      </div>
    </div>
  )
})

Choose.propTypes = {
  passengers: PropTypes.array.isRequired,
  onUpdate: PropTypes.func.isRequired,
}

export default Choose
