import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Menu, Space, Tag } from 'antd';
import { useRef } from 'react';
import request from 'umi-request';
const columns = [
    {
        dataIndex: 'index',
        valueType: 'indexBorder',
        width: 48,
    },
    {
        title: 'Mã giao dịch',
        dataIndex: 'title',
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
        disable: true,
        title: 'Số tiền',
        dataIndex: 'state',
        filters: true,
        onFilter: true,
        valueType: 'select',
        
    },
    {
        disable: true,
        title: 'Quy đổi (VNĐ)- Đá (Gen)',
        dataIndex: 'labels',
        search: false,
        renderFormItem: (_, { defaultRender }) => {
            return defaultRender(_);
        },
        render: (_, record) => (<Space>
        {record.labels.map(({ name, color }) => (<Tag color={color} key={name}>
            {name}
          </Tag>))}
      </Space>),
    },
    {
        title: 'Thời gian giao dịch',
        key: 'showTime',
        dataIndex: 'created_at',
        valueType: 'date',
        sorter: true,
        hideInSearch: true,
    },
    {
        title: 'Khoảng thời gian',
        dataIndex: 'created_at',
        valueType: 'dateRange',
        hideInTable: true,
        search: {
            transform: (value) => {
                return {
                    startTime: value[0],
                    endTime: value[1],
                };
            },
        },
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        hideInSearch: true,
        valueEnum: {
            0: {
                text: 'Thành công',
                status: 'Success',
            },
            1: {
                text: 'Thất bại',
                status: 'Error',
            },
            2: {
                text: 'Đang xử lý',
                status: 'Processing',
            }
          },
    },
];
export default () => {
    const actionRef = useRef();
    return (<ProTable columns={columns} actionRef={actionRef} cardBordered request={async (params = {}, sort, filter) => {
            console.log(sort, filter);
            return request('https://proapi.azurewebsites.net/github/issues', {
                params,
            });
        }} editable={{
            type: 'multiple',
        }} columnsState={{
            persistenceKey: 'pro-table-singe-demos',
            persistenceType: 'localStorage',
            onChange(value) {
                console.log('value: ', value);
            },
        }} rowKey="id" search={{
            labelWidth: 'auto',
        }} options={{
            setting: {
                listsHeight: 400,
            },
        }} form={{
            // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
            syncToUrl: (values, type) => {
                if (type === 'get') {
                    return Object.assign(Object.assign({}, values), { created_at: [values.startTime, values.endTime] });
                }
                return values;
            },
        }} pagination={{
            pageSize: 10,
            onChange: (page) => console.log(page),
        }} dateFormatter="string" headerTitle="Danh sách giao dịch nạp tiền" 
         toolBarRender={() => [
        ]}/>);
};