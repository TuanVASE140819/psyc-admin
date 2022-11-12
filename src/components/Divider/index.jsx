import { StatisticCard } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import { useState } from 'react';

export default function ABC({ data }) {
  const [responsive, setResponsive] = useState(false);

  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      <StatisticCard.Group direction={responsive ? 'column' : 'row'}>
        <StatisticCard
          statistic={{
            title: 'ĐẶT LỊCH THÀNH CÔNG',
            value: data.sucessBooking,
            // icon: (<img style={imgStyle} src="https://gw.alipayobjects.com/mdn/rms_7bc6d8/afts/img/A*dr_0RKvVzVwAAAAAAAAAAABkARQnAQ" alt="icon"/>),
          }}
        />
        <StatisticCard
          statistic={{
            title: 'KHÁCH HÀNG',
            value: data.totalCustomer,
            // icon: (<img style={imgStyle} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx2ZB_xcLS_E644SJl1SqRH9aJ_pXnSlqY8Q&usqp=CAU" alt="icon"/>),
          }}
        />
        <StatisticCard
          statistic={{
            title: 'TƯ VẤN VIÊN',
            value: data.totalConsultant,
            // icon: (<img style={imgStyle} src="https://tuyensinh.huce.edu.vn/images57/Files/support-icon.png " alt="icon"/>),
          }}
        />
        <StatisticCard
          statistic={{
            title: 'DOANH THU',
            value: data.income,
            suffix: 'VND',
            // icon: (<img style={imgStyle} src="https://gw.alipayobjects.com/mdn/rms_7bc6d8/afts/img/A*dr_0RKvVzVwAAAAAAAAAAABkARQnAQ" alt="icon"/>),
          }}
        />
      </StatisticCard.Group>
    </RcResizeObserver>
  );
}
