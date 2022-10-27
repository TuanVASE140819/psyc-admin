import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Menu, message, Space, Tag, Modal } from 'antd';
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
  {
    title: 'Tài khoản nhận',
    dataIndex: 'receiveAccountid',
    valueType: 'text',
    search: false,
    sorter: (a, b) => a.accountNumber - b.accountNumber,
    tip: 'Tài khoản nhận',
    // nếu receiveAccountid = 1 thì hiện thị tài khoản 1
    render: (dom, entity) => {
      return <Tag color="green">{entity.receiveAccountid === 1 ? 'Tài khoản 1' : ''}</Tag>;
    },

    formItemProps: {
      rules: [
        {
          required: true,
          message: 'Tài khoản nhận là bắt buộc',
        },
      ],
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
    valueType: 'date',
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
          // neu status la waiting thi hien thi 2 nut chấp nhận và từ chối giao dịch
          <Space>
            <Button
              // màu xanh lá cây
              type="primary"
              onClick={() => {
                // hiện thị modal xác nhận chấp nhận giao dịch
                Modal.confirm({
                  title: 'Xác nhận chấp nhận giao dịch',
                  content: 'Bạn có chắc chắn chấp nhận giao dịch này không?',
                  okText: 'Chấp nhận',
                  cancelText: 'Hủy',
                  onOk: () => {
                    // nếu chấp nhận thì gọi hàm acceptDeposit
                    acceptDeposit(entity.id);
                    setTimeout(() => {
                      window.location.reload();
                      message.success('Chấp nhận giao dịch thành công');
                    }, 4000);
                  },
                });
              }}
            >
              Chấp nhận
            </Button>
            <Button
              // màu đỏ
              type="danger"
              onClick={() => {
                // hiện thị modal xác nhận từ chối giao dịch
                Modal.confirm({
                  title: 'Xác nhận từ chối giao dịch',
                  content: 'Bạn có chắc chắn từ chối giao dịch này không?',
                  okText: 'Từ chối',
                  cancelText: 'Hủy',
                  onOk: () => {
                    // nếu từ chối thì gọi hàm rejectDeposit
                    rejectDeposit(entity.id);
                    setTimeout(() => {
                      window.location.reload();
                      message.success('Từ chối giao dịch thành công');
                    }, 4000);
                  },
                });
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
            code: params.code,
            dateCreate: params.dateCreate,
            walletid: params.walletid,
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
        // search code
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
