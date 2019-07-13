import React from 'react';

import { Link } from 'react-router-dom';

const TeamStats = props => {
  const kills = [];
  const name = [];
  const damageDealt = [];
  const assists = [];
  const timeSurvived = [];
  const DBNOs = [];

  Object.values(props.team).map((member, idx) => {

    const survivalMinutes = Math.floor(member.timeSurvived / 60);
    const survivalSeconds = Math.round(((member.timeSurvived / 60) % 1) * 60);

    if (props.player.name !== member.name) {
      name.push(<span key={idx}><Link to={`/players/${member.name}`}>{member.name}</Link></span>);
      kills.push(<span key={idx}>{member.kills}</span>);
      damageDealt.push(<span key={idx}>{member.damageDealt.toFixed(0)}</span>);
      assists.push(<span key={idx}>{member.assists}</span>);
      DBNOs.push(<span key={idx}>{member.DBNOs}</span>);
      timeSurvived.push(<span key={idx}>{survivalMinutes + ":"}{survivalSeconds < 10 ? ("0" + survivalSeconds) : survivalSeconds}</span>);
    } else {
      name.push(<span key={idx} style={{fontWeight: '700'}}>{member.name}</span>);
      kills.push(<span key={idx} style={{fontWeight: '700'}}>{member.kills}</span>);
      damageDealt.push(<span key={idx} style={{fontWeight: '700'}}>{member.damageDealt.toFixed(0)}</span>);
      assists.push(<span key={idx} style={{fontWeight: '700'}}>{member.assists}</span>);
      DBNOs.push(<span key={idx} style={{fontWeight: '700'}}>{member.DBNOs}</span>);
      timeSurvived.push(<span key={idx} style={{fontWeight: '700'}}>{survivalMinutes + ":"}{survivalSeconds < 10 ? ("0" + survivalSeconds) : survivalSeconds}</span>);
    };
  });

  return (
    <>
      <ul className="team-member-stats">
        <li className="team-member-name" key="name">
          <br/>
          {name}
        </li>
        <li key="kills" className="team-member-stat-column">
          <h2>Kills</h2>
          {kills}
        </li>
        <li key="damageDealt" className="team-member-stat-column">
          <h2>Damage</h2>
          {damageDealt}
        </li>
        <li key="assists" className="team-member-stat-column">
          <h2>Assists</h2>
          {assists}
        </li>
        <li key="time-survived" className="team-member-stat-column">
          <h2>Survived</h2>
          {timeSurvived}
        </li>
        <li key="dbno" className="team-member-stat-column">
          <h2>DBNO</h2>
          {DBNOs}
        </li>
      </ul>
      <section className="full-match-stats-link">
        <Link to={`/matches/${props.matchId}`}>View Full Stats</Link>
      </section>
    </>
  );
};

export default TeamStats;