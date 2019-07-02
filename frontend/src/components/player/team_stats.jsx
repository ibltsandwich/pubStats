import React from 'react';

import { Link } from 'react-router-dom';

const TeamStats = props => {
  const kills = [];
  const name = [];
  const damageDealt = [];
  const assists = [];

  Object.values(props.team).map((member, idx) => {
    if (props.player.name !== member.name) {
      name.push(<span key={idx}><Link to={`/players/${member.name}`}>{member.name}</Link></span>);
      kills.push(<span key={idx}>{member.kills}</span>);
      damageDealt.push(<span key={idx}>{member.damageDealt.toFixed(2)}</span>)
      assists.push(<span key={idx}>{member.assists}</span>)
    } else {
      name.push(<span key={idx} style={{fontWeight: '700'}}>{member.name}</span>);
      kills.push(<span key={idx} style={{fontWeight: '700'}}>{member.kills}</span>);
      damageDealt.push(<span key={idx} style={{fontWeight: '700'}}>{member.damageDealt.toFixed(2)}</span>)
      assists.push(<span key={idx} style={{fontWeight: '700'}}>{member.assists}</span>)
    };
  });

  return (
    <ul className="team-member-stats">
      <li className="team-member-name" key="name">
        <br/>
        {name}
      </li>
      <li key="kills" className="team-member-kills">
        <h2>Kills</h2>
        {kills}
      </li>
      <li key="damageDealt" className="team-member-damage">
        <h2>Damage</h2>
        {damageDealt}
      </li>
      <li key="assists" className="team-member-assists">
        <h2>Assists</h2>
        {assists}
      </li>
    </ul>
  );
};

export default TeamStats;