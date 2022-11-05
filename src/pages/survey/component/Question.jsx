import { Avatar, Button, Card, Col } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { history } from 'umi';
import React, { useEffect, useState } from 'react';
import { ProCard } from '@ant-design/pro-components';
import style from './zodiac.less';

const Zodiac = (props) => {
  const { zodiac } = props;
  //list data zodiac
  const [dataList, setDataList] = useState([]);
  const handleClick = () => {};
  return (
    <>
      <Col
        span={26}
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
          />
          <div className={style.content}>
            <div className={style.title}>Bộ câu hỏi 1</div>
          </div>
        </Card>
      </Col>
    </>
  );
};

export default Zodiac;
