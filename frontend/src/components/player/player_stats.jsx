import React from 'react';
import { Link } from 'react-router-dom';

const PlayerStats = (props) => {
  const { survivalMinutes, survivalSeconds, match } = props;

  let placementMessage;
  if (match.stats.winPlace === 1){
    placementMessage = "WINNER WINNER CHICKEN DINNER!";
  } else if(match.stats.winPlace <= 10) {
    placementMessage = "TOP 10";
  } else {
    placementMessage = "DID NOT PLACE";
  }

  return (
    <>
      <h1 className="placement-message">{placementMessage}</h1>
      <div className="player-attributes">
        <span>
          <span>Time Survived: </span>
          <span style={{fontWeight: 700}}>{survivalMinutes + ":"}{survivalSeconds < 10 ? ("0" + survivalSeconds) : survivalSeconds}</span>
        </span>
        <span>
          <span>Distance Traveled: </span>
          <span style={{fontWeight: 700}}>{((match.stats.walkDistance + match.stats.swimDistance + match.stats.rideDistance) / 1000).toFixed(2)}km</span>
        </span>
      </div>
      <div className="player-stats">
        <span>
          <span>Kills: </span>
          <span style={{fontWeight: 700}}>{match.stats.kills}</span>
        </span>
        <span>
          <span>Damage Dealt: </span>
          <span style={{fontWeight: 700}}>{match.stats.damageDealt.toFixed(2)}</span>
        </span>
      </div>
      <Link to={`/matches/${match.id}`}>View Full Stats</Link>
    </>
  )
}

export default PlayerStats;