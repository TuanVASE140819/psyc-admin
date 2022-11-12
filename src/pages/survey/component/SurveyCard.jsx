import { PageContainer, ProCard } from '@ant-design/pro-components';
import { EditOutlined, EllipsisOutlined, SettingOutlined, DeleteOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Skeleton } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { history } from 'umi';

const surveyType = (props) => {
  const { surveyType, onClick, onEdit, onDelete, onChange } = props;
  const handleClick = () => {
    history.push(`/survey/${surveyType.id}`);
  };
  return (
    <ProCard style={{ height: 180 }}>
      <Card
        style={{
          width: '100%',
          border: '3px solid #1890ff',
          // đường viền bên trong màu xanh
          borderRadius: '20px',
          // bo tròn góc
          boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
          // đổ bóng
          transition: '0.3s',
          // thời gian chuyển động
          cursor: 'pointer',
          // ant-card-actions có border-top: 1px solid #e8e8e8;

          borderBlockColor: '#1890ff',
        }}
        actions={[
          <DeleteOutlined key="setting" onClick={() => onDelete(surveyType)} />,
          // edit
          <EditOutlined key="edit" style={{}} onClick={() => onEdit(surveyType)} />,
          <div onClick={handleClick} key="ellipsis">
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
