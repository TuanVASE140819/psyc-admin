import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Avatar, Card, Skeleton, Switch, Col, Row } from 'antd';
import React, { useState } from 'react';
const { Meta } = Card;
const surveyList = () => {
  return (
    <>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card hoverable>
            <Meta title="Khảo sát 1" description="" />
          </Card>
        </Col>
        <Col span={24}>
          <Card hoverable>
            <Meta title="Khảo sát 2" description="" />
          </Card>
        </Col>

        <Col span={24}>
          <Card hoverable>
            <Meta title="Khảo sát 3" description="" />
          </Card>
        </Col>
        <Col span={24}>
          <Card hoverable>
            <Meta title="Khảo sát 4" description="" />
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default surveyList;
