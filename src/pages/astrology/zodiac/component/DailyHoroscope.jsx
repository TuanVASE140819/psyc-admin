import { getDailyHoroscopes } from '@/services/ant-design-pro/dailyHoroscope';
import { Avatar, Card, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';

export default function DailyHoroscope() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getDailyHoroscopes();
        setData(res);
      } catch (error) {}
    };

    getData();
  }, []);

  return (
    <div>
      <Row
        gutter={[16, 16]}
        style={{
          marginBottom: '12px',
        }}
      >
        {data.map((item) => (
          <Col key={item.id}>
            <Card hoverable style={{ width: 210 }} onClick={() => handleClickCard(house)}>
              <Card.Meta avatar={<Avatar src={item.imageUrl} />} title={item.name} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
