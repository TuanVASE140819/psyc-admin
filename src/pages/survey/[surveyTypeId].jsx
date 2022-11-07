import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Avatar, Card, Skeleton, Switch, Col, Row } from 'antd';
import React, { useState, useEffect } from 'react';
import { NavLink } from 'umi';
import { getASurveyType } from '@/services/SurveyService/survey';
const { Meta } = Card;
export default (props) => {
  const {
    history: {},
    match: {
      params: { surveyTypeId },
    },
  } = props;
  const [loading, setLoading] = useState(false);
  const [surveyList, setSurveyList] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await Promise.all([getASurveyType(surveyTypeId)]);
        setSurveyList(res[0].data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    <>
      <Row gutter={[24, 24]}>
        {/* <Col span={24}>
          <Card hoverable>
            <Meta title="Khảo sát 1" description="" />
          </Card>
        </Col> */}
        {surveyList.map((item) => (
          <Col span={6}>
            <Card
              hoverable
              style={{ width: '100%', marginTop: 16 }}
              onClick={() => {
                console.log('click');
              }}
              actions={[
                <EditOutlined key="edit" />,
                <NavLink to={`/survey/${item.id}`}>Chi tiết</NavLink>,
              ]}
            >
              <Meta title={item.name} description="This is the description" />
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};
