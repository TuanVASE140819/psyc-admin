import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Menu, message, Space, Tag } from 'antd';
import { useRef } from 'react';
import request from 'umi-request';

const columns = [
  {
    title: 'STT',
    dataIndex: 'id',
    valueType: 'index',
    width: 48,
  },
  {
    title: 'Mã giao dịch',
    dataIndex: 'code',
    valueType: 'text',
    sorter: (a, b) => a.code - b.code,
    copyable: true,
    ellipsis: true,
    tip: 'Mã giao dịch là ID duy nhất của giao dịch',
    formItemProps: {
      rules: [
        {
          required: true,
          message: 'Mã giao dịch là bắt buộc',
        },
      ],
    },
  },

  {
    title: 'Tên khách hàng',
    dataIndex: 'customerName',
    valueType: 'text',
    search: false,
    sorter: (a, b) => a.customerName - b.customerName,
    tip: 'Tên khách hàng',
    formItemProps: {
      rules: [
        {
          required: false,
          message: 'Tên khách hàng là bắt buộc',
        },
      ],
    },
  },
  {
    title: 'Số tiền (VNĐ)',
    dataIndex: 'amount',
    search: false,
    valueType: 'text',
    sorter: (a, b) => a.amount - b.amount,

    render: (dom, entity) => {
      return (
        <Tag color="green">
          {/* {nếu amount nhỏ hơn 999 và lớn hơn 0 thì hiện thị amount và thêm dấu phẩn ở hàng nghìn} */}
          {entity.amount < 999 && entity.amount < 0
            ? entity.amount
            : entity.amount < 0
            ? entity.amount
            : entity.amount.toLocaleString('vi-VN', { minimumFractionDigits: 3 })}
        </Tag>
      );
    },
  },
  // render: (dom, entity) => {
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    search: false,
    valueType: 'text',
    render: (dom, entity) => {
      if (entity.status === 'waiting') {
        return <Tag color="warning">Đang chờ</Tag>;
      }

      if (entity.status === 'success') {
        return <Tag color="success">Chấp nhận</Tag>;
      }

      if (entity.status === 'fail') {
        return <Tag color="error">Từ chối</Tag>;
      }
    },
  },
  {
    title: 'Thời gian',
    dataIndex: 'dateCreate',
    valueType: 'text',
    search: true,
    sorter: (a, b) => a.dateCreate - b.dateCreate,
    // format 2022-10-23 (12:12:12)
    render: (dom, entity) => {
      if (entity.dateCreate) {
        return (
          entity.dateCreate.split('T')[0] +
          ' (' +
          entity.dateCreate.split('T')[1].split('.')[0] +
          ')'
        );
      }
    },
  },
  {
    title: 'Hành động',
    valueType: 'option',
    render: (dom, entity) => {
      return (
        // Nếu trạng thái là đang chờ thì hiện thị 2 nút chấp nhận và từ chối giao dịch nếu không thì không hiện thị
        entity.status === 'waiting' && (
          <Space>
            <Button
              // màu xanh lá cây
              type="primary"
              onClick={() => {
                acceptDeposit(entity.id);
                // sau 4 s thì reload lại trang
                setTimeout(() => {
                  window.location.reload();
                  message.success('Chấp nhận giao dịch thành công');
                }, 4000);
              }}
            >
              Chấp nhận
            </Button>
            <Button
              onClick={() => {
                rejectDeposit(entity.id);
                setTimeout(() => {
                  window.location.reload();
                  message.success('Chấp nhận giao dịch thành công');
                }, 4000);
              }}
            >
              Từ chối
            </Button>
          </Space>
        )
      );
    },
  },
];

// https://psycteam.azurewebsites.net/api/Deposits/acceptdeposit?id=1
const acceptDeposit = async (id) => {
  const res = await request(
    `https://psycteam.azurewebsites.net/api/Deposits/acceptdeposit?id=${id}`,
    {
      method: 'PUT',
    },
  );
  return res;
};

//https://psycteam.azurewebsites.net/api/Deposits/rejectdeposit?id=1
const rejectDeposit = async (id) => {
  const res = await request(
    `https://psycteam.azurewebsites.net/api/Deposits/rejectdeposit?id=${id}`,
    {
      method: 'PUT',
    },
  );
  return res;
};

export default () => {
  const actionRef = useRef();

  return (
    <ProTable
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params = {}, sort, filter) => {
        console.log(sort, filter);
        //psycteam.azurewebsites.net/api/Deposits/Getalldeposit?date=2002&walletid=1&pagesize=20&pagenumber=1
        https: return request('https://psycteam.azurewebsites.net/api/Deposits/Getalldeposit', {
          params: {
            ...params,
            pageSize: params.pageSize,
            pageNumber: params.current,
          },
        });
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return Object.assign(Object.assign({}, values), {
              created_at: [values.startTime, values.endTime],
            });
          }
          return values;
        },
      }}
      pagination={{
        //phân trang theo api trả về
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '30', '40', '50'],
        defaultPageSize: 10,
        defaultCurrent: 1,
        total: 100,
        showTotal: (total, range) => `Hiển thị ${range[0]}-${range[1]} của ${total} kết quả`,
      }}
      dateFormatter="string"
      headerTitle="Danh sách giao dịch nạp tiền"
      toolBarRender={() => []}
    />
  );
};