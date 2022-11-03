import { Avatar, Card, Col } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { history } from 'umi';
import React from 'react';
import style from './zodiac.less';

const Zodiac = (props) => {
  const { zodiac } = props;
  const handleClick = () => {
    history.push(`/survey/${zodiac.id}`);
  };
  return (
    <Col
      span={26}
      key={zodiac.id}
      style={{
        margin: '34px',
        paddingBottom: '66px',
      }}
    >
      <Card
        bordered={true}
        onClick={handleClick}
        className={style.card}
        style={{
          padding: '32px',
        }}
      >
        <Meta
          style={{
            // Căn giữa
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          title={zodiac.title}
        />
      </Card>
    </Col>
  );
};

export default Zodiac;
