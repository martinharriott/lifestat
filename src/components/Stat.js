import React from 'react';
import statColourMap from '../util/statUtility';

export default function Stat({stat, color}) {
  return (
    <div className={"text-center rounded-t-3xl p-5 text-lg "+ statColourMap.get(stat.name)}>
        <div className="font-semibold">{stat.name}</div>
        <h2 className="text-3xl">{stat.value}</h2>
    </div>
  )
}
