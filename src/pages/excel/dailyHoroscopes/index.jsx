import {
  EditableProTable,
  ProCard,
  ProForm,
  ProFormDependency,
  ProFormDigit,
  ProFormDateTimePicker,
  ProFormSelect,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import {
  getDailyHoroscope,
  getDailyHoroscopes,
  updateDailyHoroscope,
  uploadFileExcel,
} from '@/services/ant-design-pro/dailyHoroscope';
import React, { useRef, useState } from 'react';
const defaultData = [
  {
    id: 3,

    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/psychologicalcounseling-28efa.appspot.com/o/zodiac%2Ftaurus.png?alt=media&token=1b0b0b9b-1b8f-4b0f-8b1f-1f1f1f1f1f1f',
    date: '2022-01-01T00:00:00',
    context:
      'Ma Kết là một chòm sao tương đối âm thầm, hai ngôi sao sáng nhất trong chòm Ma Kết cũng chỉ rộng 3m. \nTừ phía chòm sao Ngưu Lang và Chức Nữ kéo dài hơn một bộ về phía Nam, \nsẽ có thể thấy được Sao β sáng nhất trong chòm sao Ma Kết',
    job: 'Bạn luôn cảm thấy bất an do mọi chuyện tưởng chừng như đơn giản nhưng thực tế lại vô cùng rắc rối, không thể tháo gỡ, nó xảy ra bất cứ lúc nào. Thậm chí là trong khoảng thời gian mà bạn không hề lường trước được. Bạn hãy suy nghĩ cận thân trước khi đưa ra quyết định',
    affection:
      'Chuyên tình cảm của bạn không có nhiều biến động trong hôm nay.\nNgười đã có dôi vẫn ngọt ngào bên nữa kua, người cô đơn vẫn rất hài lòng với cuộc sống độc thân của mình',
    luckyNumber: 1,
    goodTime: '15:00',
    color: 'Đỏ, Vàng',
    shouldThing: 'Xem phim, Ăn uống',
    shouldNotThing: 'Ngồi một mình, Đi trễ',
    zodiacId: 1,
  },

  {
    id: 1,

    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/psychologicalcounseling-28efa.appspot.com/o/zodiac%2Ftaurus.png?alt=media&token=1b0b0b9b-1b8f-4b0f-8b1f-1f1f1f1f1f1f',
    date: '2022-01-01T00:00:00',
    context:
      'Ma Kết là một chòm sao tương đối âm thầm, hai ngôi sao sáng nhất trong chòm Ma Kết cũng chỉ rộng 3m. \nTừ phía chòm sao Ngưu Lang và Chức Nữ kéo dài hơn một bộ về phía Nam, \nsẽ có thể thấy được Sao β sáng nhất trong chòm sao Ma Kết',
    job: 'Bạn luôn cảm thấy bất an do mọi chuyện tưởng chừng như đơn giản nhưng thực tế lại vô cùng rắc rối, không thể tháo gỡ, nó xảy ra bất cứ lúc nào. Thậm chí là trong khoảng thời gian mà bạn không hề lường trước được. Bạn hãy suy nghĩ cận thân trước khi đưa ra quyết định',
    affection:
      'Chuyên tình cảm của bạn không có nhiều biến động trong hôm nay.\nNgười đã có dôi vẫn ngọt ngào bên nữa kua, người cô đơn vẫn rất hài lòng với cuộc sống độc thân của mình',
    luckyNumber: 1,
    goodTime: '15:00',
    color: 'Đỏ, Vàng',
    shouldThing: 'Xem phim, Ăn uống',
    shouldNotThing: 'Ngồi một mình, Đi trễ',
    zodiacId: 1,
  },

  {
    id: 2,

    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/psychologicalcounseling-28efa.appspot.com/o/zodiac%2Ftaurus.png?alt=media&token=1b0b0b9b-1b8f-4b0f-8b1f-1f1f1f1f1f1f',
    date: '2022-01-01T00:00:00',
    context:
      'Ma Kết là một chòm sao tương đối âm thầm, hai ngôi sao sáng nhất trong chòm Ma Kết cũng chỉ rộng 3m. \nTừ phía chòm sao Ngưu Lang và Chức Nữ kéo dài hơn một bộ về phía Nam, \nsẽ có thể thấy được Sao β sáng nhất trong chòm sao Ma Kết',
    job: 'Bạn luôn cảm thấy bất an do mọi chuyện tưởng chừng như đơn giản nhưng thực tế lại vô cùng rắc rối, không thể tháo gỡ, nó xảy ra bất cứ lúc nào. Thậm chí là trong khoảng thời gian mà bạn không hề lường trước được. Bạn hãy suy nghĩ cận thân trước khi đưa ra quyết định',
    affection:
      'Chuyên tình cảm của bạn không có nhiều biến động trong hôm nay.\nNgười đã có dôi vẫn ngọt ngào bên nữa kua, người cô đơn vẫn rất hài lòng với cuộc sống độc thân của mình',
    luckyNumber: 1,
    goodTime: '15:00',
    color: 'Đỏ, Vàng',
    shouldThing: 'Xem phim, Ăn uống',
    shouldNotThing: 'Ngồi một mình, Đi trễ',
    zodiacId: 1,
  },
];
export default () => {
  const [editableKeys, setEditableRowKeys] = useState(() => []);
  const formRef = useRef();
  const actionRef = useRef();
  const editableFormRef = useRef();
  const columns = [
    {
      title: 'Cung hoàng đạo',
      dataIndex: 'imageUrl',
      valueType: 'image',
      width: 100,
      ellipsis: true,
    },
    {
      title: 'Ngày',
      key: 'type',
      dataIndex: 'date',
      valueType: 'date',
      width: 100,
      ellipsis: true,
    },
    {
      title: 'Tổng quan',
      width: 200,
      dataIndex: 'context',
      valueType: 'textarea',
    },
    {
      title: 'Công việc',
      width: 200,
      dataIndex: 'job',
      valueType: 'textarea',
    },
    {
      title: 'Tình cảm',
      width: 200,
      dataIndex: 'affection',
      valueType: 'textarea',
    },
    {
      title: 'Số may mắn',
      ProFormDigit: true,
      dataIndex: 'luckyNumber',
      valueType: 'digit',
    },
    {
      title: 'Thời gian tốt',
      dataIndex: 'goodTime',
      valueType: 'time',
    },
    {
      title: 'Màu sắc',
      dataIndex: 'color',
      valueType: 'textarea',
    },
    {
      title: 'Cần làm',
      dataIndex: 'shouldThing',
      valueType: 'textarea',
    },
    {
      title: 'Không nên làm',
      dataIndex: 'shouldNotThing',
      valueType: 'textarea',
    },

    {
      title: 'Thao tác',
      valueType: 'option',
      render: (_, row) => [
        <a
          key="edit"
          onClick={() => {
            var _a;
            (_a = actionRef.current) === null || _a === void 0 ? void 0 : _a.startEditable(row.id);
          }}
        >
          Sửa
        </a>,
      ],
    },
  ];
  return (
    <ProCard>
      <div
        style={{
          maxWidth: '100%',
          margin: 'auto',
        }}
      >
        <ProForm
          formRef={formRef}
          initialValues={{
            table: defaultData,
          }}
        >
          <ProFormDependency name={['table']}>
            {({ table }) => {
              const info = table.reduce(
                (pre, item) => {
                  return {
                    totalScore:
                      pre.totalScore +
                      parseInt(
                        (
                          (item === null || item === void 0 ? void 0 : item.fraction) || 0
                        ).toString(),
                        10,
                      ),
                    questions:
                      pre.questions +
                      parseInt(
                        (
                          (item === null || item === void 0 ? void 0 : item.questionsNum) || 0
                        ).toString(),
                        10,
                      ),
                  };
                },
                { totalScore: 0, questions: 0 },
              );
              return (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    paddingBlockEnd: 16,
                  }}
                >
                  <div style={{ flex: 1 }}>Tổng lá phiếu：{info.totalScore}</div>
                  {/* <div style={{ flex: 1 }}>题数：{info.questions}</div> */}
                  <div style={{ flex: 2 }}>
                    <ProFormDateTimePicker
                      name="time"
                      label="Tìm kiếm theo thời gian"
                      dataIndex="date"
                      fieldProps={{
                        showTime: true,
                      }}
                      // format="YYYY-MM-DD"
                    />
                  </div>
                  <div style={{ flex: 2 }}>
                    <ProFormSelect
                      name="type"
                      label="Tìm kiếm theo loại"
                      options={[
                        {
                          label: 'Tất cả',
                          value: 'all',
                        },
                        {
                          label: 'Bạch Dương',
                          value: 'job',
                        },
                        {
                          label: 'Kim Ngưu',
                          value: 'affection',
                        },
                      ]}
                    />
                  </div>
                </div>
              );
            }}
          </ProFormDependency>
          <EditableProTable
            rowKey="id"
            scroll={{
              x: true,
            }}
            editableFormRef={editableFormRef}
            controlled
            actionRef={actionRef}
            formItemProps={{
              label: 'Lá phiếu tử vi',
              rules: [
                {
                  validator: async (_, value) => {
                    if (value.length < 1) {
                      throw new Error('至少需要一行');
                    }
                    if (value.length > 5) {
                      throw new Error('最多可以设置五个题库');
                    }
                  },
                },
              ],
            }}
            maxLength={10}
            name="table"
            columns={columns}
            recordCreatorProps={{
              record: (index) => {
                return { id: index + 1 };
              },
            }}
            editable={{
              type: 'multiple',
              editableKeys,
              onChange: setEditableRowKeys,
              title: 'Sửa',
            }}
          />
          <ProFormUploadButton
            label="Tải lên file excel"
            title="Tải lên file excel"
            name="file"
            action="https://psycteam.azurewebsites.net/api/DailyHoroscopes/CreateExcel"
            maxCount={1}
            fieldProps={{
              accept: '.xlsx, .xls',
            }}
            beforeUpload={async (file) => {
              const isExcel =
                file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
              if (!isExcel) {
                message.error('Bạn chỉ có thể tải lên tệp EXCEL!');
              }
              const isLt4M = file.size / 1024 / 1024 < 4;
              if (!isLt4M) {
                message.error('File phải nhỏ hơn 4MB!');
              }
              message.loading({ content: 'Đang tải lên ...', key: 'loading' });
              return isExcel && isLt4M;
            }}
            onSuccess={(res) => {
              if (res) {
                message.success('Tải lên file excel thành công!');
              }
              console.log(res);
            }}
          />
        </ProForm>
      </div>
    </ProCard>
  );
};
