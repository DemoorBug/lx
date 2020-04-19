import React, { memo } from 'react'
import './Sublime.css'

export default memo(function Sublime() {
  return (
    <div className="submit">
      <button type="submit" className="submit-button">搜索</button>
    </div>
  )
})
