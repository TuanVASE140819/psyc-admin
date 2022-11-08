import { PageContainer, ProCard } from '@ant-design/pro-components';
import { EditOutlined, EllipsisOutlined, SettingOutlined, DeleteOutlined } from '@ant-design/icons';
import { Avatar, Card, Col } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { history } from 'umi';

const surveyType = (props) => {
  const { surveyType } = props;
  const handleClick = () => {
    history.push(`/survey/${surveyType.id}`);
  };
  return (
    <ProCard style={{ height: 200 }}>
      <Card
        style={{
          width: '100%',
          marginTop: 16,
        }}
        onClick={() => {
          console.log('click');
        }}
        actions={[
          <DeleteOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <div onClick={handleClick} key="ellipsis">
            Chi tiết
          </div>,
        ]}
      >
        <Meta title={surveyType.name} description="This is the description" />
      </Card>
    </ProCard>
  );
};

export default surveyType;
