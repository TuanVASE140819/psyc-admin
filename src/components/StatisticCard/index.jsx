import { ProCard, StatisticCard } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import { Column } from '@ant-design/plots';
const { Statistic } = StatisticCard;
import { Avatar, Card, Rate, Skeleton, Switch, Col } from 'antd';

import { ProList } from '@ant-design/pro-components';
import { Button, Progress, Space, Tag } from 'antd';
import { useState } from 'react';

const dataSource = [
  {
    title: 'Vũ Anh Tuấn',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  },
  {
    title: 'Nguyễn Văn A',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  },
  {
    title: 'Nguyễn Văn B',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  },
  {
    title: 'Nguyễn Văn C',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  },
  {
    title: 'Nguyễn Văn D',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  },
  {
    title: 'Vũ Anh Tuấn',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  },
  {
    title: 'Nguyễn Văn A',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  },
  {
    title: 'Nguyễn Văn B',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  },
  {
    title: 'Nguyễn Văn C',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  },
  {
    title: 'Nguyễn Văn D',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  },
];
export default () => {
  const data = [
    {
      name: 'Rút',
      Month: 'Tháng 1',
      money: 186.9,
    },
    {
      name: 'Rút',
      Month: 'Tháng 2',
      money: 28.8,
    },
    {
      name: 'Rút',
      Month: 'Tháng 3',
      money: 39.3,
    },
    {
      name: 'Rút',
      Month: 'Tháng 4',
      money: 81.4,
    },
    {
      name: 'Rút',
      Month: 'Tháng 5',
      money: 47,
    },
    {
      name: 'Rút',
      Month: 'Tháng 6',
      money: 20.3,
    },
    {
      name: 'Rút',
      Month: 'Tháng 7',
      money: 24,
    },
    {
      name: 'Rút',
      Month: 'Tháng 8',
      money: 35.6,
    },
    {
      name: 'Nạp',
      Month: 'Tháng 1',
      money: 12.4,
    },
    {
      name: 'Nạp',
      Month: 'Tháng 2',
      money: 23.2,
    },
    {
      name: 'Nạp',
      Month: 'Tháng 3',
      money: 34.5,
    },
    {
      name: 'Nạp',
      Month: 'Tháng 4',
      money: 99.7,
    },
    {
      name: 'Nạp',
      Month: 'Tháng 5',
      money: 52.6,
    },
    {
      name: 'Nạp',
      Month: 'Tháng 6',
      money: 35.5,
    },
    {
      name: 'Nạp',
      Month: 'Tháng 7',
      money: 37.4,
    },
    {
      name: 'Nạp',
      Month: 'Tháng 8',
      money: 42.4,
    },
  ];
  const config = {
    data,
    isGroup: true,
    xField: 'Month',
    yField: 'money',
    seriesField: 'name',

    /** 设置颜色 */
    //color: ['#1ca9e6', '#f88c24'],

    /** 设置间距 */
    // marginRatio: 0.1,
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'middle', 'bottom'
      // 可配置附加的布局方法
      layout: [
        // 柱形图数据标签位置自动调整
        {
          type: 'interval-adjust-position',
        }, // 数据标签防遮挡
        {
          type: 'interval-hide-overlap',
        }, // 数据标签文颜色自动调整
        {
          type: 'adjust-color',
        },
      ],
    },
  };
  const [responsive, setResponsive] = useState(false);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys) => setSelectedRowKeys(keys),
  };

  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      <ProCard
        title="THỐNG KÊ DOANH THU"
        extra=""
        split={responsive ? 'horizontal' : 'vertical'}
        headerBordered
        bordered
        width="70%"
      >
        <ProCard split="horizontal">
          <ProCard split="horizontal">
            <ProCard split="vertical">
              <StatisticCard
                statistic={{
                  title: 'DOANH THU NGÀY',
                  value: 234,
                  description: <Statistic title="Ngày hôm qua" value="8.04%" trend="down" />,
                }}
              />
              <StatisticCard
                statistic={{
                  title: 'DOANH THU THÁNG',
                  value: 234,
                  description: <Statistic title="Tháng trước" value="8.04%" trend="up" />,
                }}
              />
            </ProCard>
            <ProCard split="vertical">
              <StatisticCard
                statistic={{
                  title: 'TỔNG RÚT(VNĐ)',
                  value: '120.000.000',
                  suffix: 'VND',
                }}
              />
              <StatisticCard
                statistic={{
                  title: 'TỔNG NẠP(VNĐ)',
                  value: '120.000.000',
                  suffix: 'VND',
                }}
              />
            </ProCard>
          </ProCard>
          <h1>Tỉ lệ rút nạp</h1>
          <Column
            {...config}
            style={{
              height: '300px',
            }}
          />
        </ProCard>
        <ProCard split="horizontal">
          <ProList
            rowKey="title"
            headerTitle="TOP 10 TƯ VẤN VIÊN CÓ LƯỢT ĐẶT LỊCH NHIỀU NHẤT"
            expandable={{ expandedRowKeys, onExpandedRowsChange: setExpandedRowKeys }}
            dataSource={dataSource}
            metas={{
              title: {},
              subTitle: {
                render: () => {
                  return (
                    <Space size={0}>
                      <Tag color="blue">Gia đình</Tag>
                      <Tag color="#5BD8A6">Tình cảm</Tag>
                    </Space>
                  );
                },
              },
              description: {
                render: () => {
                  return <Rate value={4} />;
                },
              },
              avatar: {},

              actions: {
                render: () => {
                  return <a key="invite">Số lượt đặt lịch thành công : 200</a>;
                },
              },
            }}
          />
        </ProCard>
      </ProCard>
    </RcResizeObserver>
  );
};
