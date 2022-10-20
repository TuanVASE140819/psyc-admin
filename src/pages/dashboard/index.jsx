import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Col, Row, Skeleton } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import ProSkeleton from '@ant-design/pro-skeleton';
import Divider from '@/components/Divider';
import StatisticCard from '@/components/StatisticCard';


const Dashboard = () => {
   
  return (
    <PageContainer>
      <Content>
        <Row gutter={16}>
          <Col span={24}>
            <Divider/>
          </Col>
        </Row>
        <Row gutter={16}
          style={{
            marginTop: 24,
            width: '100%',
          }}
        >
          <StatisticCard/>
        </Row>
      </Content>
    </PageContainer>
  );
};

export default Dashboard;
