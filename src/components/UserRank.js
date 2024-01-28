import React, {useState} from 'react'
import "./css/UserRank.css"

const UserRank = ({ userName, totalTime }) => {
  const [time, setTime] = useState();
  return (
    <div className='userRankRow'>
      <div className='name'>
        {userName}
      </div>
      <div className='time'>
        {totalTime}
      </div>
    </div>
  )
}

export default UserRank