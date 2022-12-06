import React from 'react'
import { Outlet } from 'react-router-dom'
import SearchContent from './SearchContent'

function Marketing() {
  return (
    <div>
      <SearchContent />
      <Outlet />
    </div>
  )
}
export default Marketing
