import { Col, Row } from 'antd';
import React from 'react';
import Zodiac from './Zodiac';

const SurveyTypeList = (props) => {
  const { dataList } = props;

  return (
    <Col
      gutter={[16, 16]}
      style={{
        marginBottom: '12px',
        marginTop: '12px',
      }}
    >
      {dataList.map((item) => (
        <Zodiac zodiac={item} />
      ))}
    </Col>
  );
};

export default SurveyTypeList;
