import React from 'react';

const PlayerStats = (props) => {
  return (
    <>
      <div className="player-attributes">
        <span>
          <span>Time Survived: </span>
          <span style={{fontWeight: 700}}>{props.survivalMinutes + ":"}{props.survivalSeconds < 10 ? ("0" + props.survivalSeconds) : props.survivalSeconds}</span>
        </span>
        <span>
          <span>Distance Traveled: </span>
          <span style={{fontWeight: 700}}>{((props.match.stats.walkDistance + props.match.stats.swimDistance + props.match.stats.rideDistance) / 1000).toFixed(2)}km</span>
        </span>
      </div>
      <div className="player-stats">
        <span>
          <span>Kills: </span>
          <span style={{fontWeight: 700}}>{props.match.stats.kills}</span>
        </span>
        <span>
          <span>Damage Dealt: </span>
          <span style={{fontWeight: 700}}>{props.match.stats.damageDealt.toFixed(2)}</span>
        </span>
      </div>
    </>
  )
}

export default PlayerStats;