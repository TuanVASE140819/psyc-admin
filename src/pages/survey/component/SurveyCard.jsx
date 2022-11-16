import { PageContainer, ProCard } from '@ant-design/pro-components';
import { EditOutlined, EllipsisOutlined, SettingOutlined, DeleteOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Skeleton } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { history } from 'umi';

const surveyType = (props) => {
  const { surveyType, onClick, onEdit, onDelete, onChange } = props;
  return (
    <ProCard style={{ height: 180 }}>
      <Card
        style={{
          width: '100%',
          border: '1px solid #1890ff',
          boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
          // đổ bóng
          transition: '0.3s',
          // thời gian chuyển động
          cursor: 'pointer',

          borderBlockColor: '#1890ff',
        }}
        actions={[
          <DeleteOutlined key="setting" onClick={() => onDelete(surveyType)} />,
          // edit
          <EditOutlined key="edit" style={{}} onClick={() => onEdit(surveyType)} />,
          <div onClick={() => onClick(surveyType)} key="ellipsis">
            Chi tiết
          </div>,
        ]}
      >
        <Meta
          style={{
            // căn giữa

            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          title={'Tên loại khảo sát: ' + surveyType.name}
        />
      </Card>
    </ProCard>
  );
};

export default surveyType;
