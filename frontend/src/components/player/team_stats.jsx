import React from 'react';

const TeamStats = props => {
  const kills = [];
  const name = [];
  const damageDealt = [];
  const assists = [];

  Object.values(props.team).map((member, idx) => {
    name.push(<span>{member.name}</span>);
    kills.push(<span>{member.kills}</span>);
    damageDealt.push(<span>{member.damageDealt.toFixed(2)}</span>)
    assists.push(<span>{member.assists}</span>)
  });

  return (
    <ul className="team-member-stats">
      <li className="team-member-name" key="name">
        <br/>
        {name}
      </li>
      <li key="kills">
        <h2>Kills</h2>
        {kills}
      </li>
      <li key="damageDealt">
        <h2>Damage</h2>
        {damageDealt}
      </li>
      <li key="assists">
        <h2>Assists</h2>
        {assists}
      </li>
    </ul>
  );
};

export default TeamStats;