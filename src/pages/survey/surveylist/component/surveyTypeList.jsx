import { Row } from 'antd';
import React from 'react';
import SurveyTypeCard from './surveyTypeCard';

const SurveyTypeList = (props) => {
  const { dataList } = props;

  return (
    <Row
      gutter={[16, 16]}
      style={{
        marginBottom: '12px',
        marginTop: '12px',
      }}
    >
      {dataList.map((item) => (
        <SurveyTypeCard surveyType={item} />
      ))}
    </Row>
  );
};

export default SurveyTypeList;
