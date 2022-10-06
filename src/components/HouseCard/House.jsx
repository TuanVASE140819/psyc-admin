import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import React from 'react';

// TODO: style
export default function HouseCard({ house, handleClickCard }) {
  return (
    <Card hoverable style={{ width: 210 }} onClick={() => handleClickCard(house)}>
      <Card.Meta
        // avatar={<Avatar src={house.imageUrl} />}
        title={house.name}
      />
    </Card>
  );
  //  <div onClick={() => handleClickCard(house)}>{house.name}</div>;
}
