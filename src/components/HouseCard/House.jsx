import React from 'react';

// TODO: style
export default function HouseCard({ house, handleClickCard }) {
  return <div onClick={() => handleClickCard(house)}>{house.name}</div>;
}
