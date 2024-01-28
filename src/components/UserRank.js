import React, {useState} from 'react'
import "./css/UserRank.css"

const UserRank = ({ userName, totalTime }) => {
    const [time, setTime] = useState();
    return (
        <div className='userRankRow'>
            {userName} : {totalTime}
        </div>
    )
}

export default UserRank