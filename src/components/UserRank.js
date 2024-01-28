import React, {useState} from 'react'
import "./css/UserRank.css"

const UserRank = ({ userName, totalScore }) => {
  return (
    <div className='userRankRow'>
      <div className='name'>
        {userName}
      </div>
      <div className='score'>
        {totalScore}
      </div>
    </div>
  )
}

export default UserRank