import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Col, Row, Skeleton } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import ProSkeleton from '@ant-design/pro-skeleton';
import Divider from '@/components/Divider';
import StatisticCard from '@/components/StatisticCard';
import {
  getReportDepositByYear,
  getReportWithdrawalByYear,
  getTopConsultantsByRate,
  getTotalDashboard,
} from '@/services/Report';

const Dashboard = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await Promise.all([
          getTotalDashboard(),
          getReportWithdrawalByYear(),
          getReportDepositByYear(),
          getTopConsultantsByRate(),
        ]);

        setData(res);
      } catch (error) {}
    };

    getData();
  }, []);

  if (!data) {
    return null;
  }

  return (
    <PageContainer>
      <Content>
        <Row gutter={16}>
          <Col span={24}>
            <Divider data={data[0]} />
          </Col>
        </Row>
        <Row
          gutter={16}
          style={{
            marginTop: 24,
            width: '100%',
          }}
        >
          <StatisticCard d={data} />
        </Row>
      </Content>
    </PageContainer>
  );
};

export default Dashboard;
