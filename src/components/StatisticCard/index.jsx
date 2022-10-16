import { ProCard, StatisticCard } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import { useState } from 'react';
import { Column } from '@ant-design/plots';
const { Statistic } = StatisticCard;
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
    return (<RcResizeObserver key="resize-observer" onResize={(offset) => {
            setResponsive(offset.width < 596);
        }}>
      <ProCard title="数据概览" extra="2019年9月28日 星期五" split={responsive ? 'horizontal' : 'vertical'} headerBordered bordered>
        <ProCard split="horizontal">
          <ProCard split="horizontal">
            <ProCard split="vertical">
              <StatisticCard statistic={{
            title: 'DOANH THU NGÀY',
            value: 234,
            description: <Statistic title="Ngày hôm qua" value="8.04%" trend="down"/>,
        }}/>
              <StatisticCard statistic={{
            title: 'DOANH THU THÁNG',
            value: 234,
            description: <Statistic title="Tháng trước" value="8.04%" trend="up"/>,
        }}/>
            </ProCard>
            <ProCard split="vertical">
              <StatisticCard statistic={{
            title: 'TỔNG RÚT money',
            value: '120.000.000',
            suffix: 'VND',
        }}/>
              <StatisticCard statistic={{
            title: 'TỔNG NẠP money',
            value: '120.000.000',
            suffix: 'VND',
        }}/>
            </ProCard>
          </ProCard>
          <h1>Tỉ lệ rút nạp</h1>
          <Column {...config}
            style={{
              height: '300px',
            }}
           />
        </ProCard>
        <ProCard title="默认尺寸" extra="extra" tooltip="这是提示" style={{ maxWidth: 300 }}>
        <div>Card content</div>
        <div>Card content</div>
        <div>Card content</div>
      </ProCard>
   
      </ProCard>
    </RcResizeObserver>);
};