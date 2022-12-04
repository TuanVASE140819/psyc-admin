import { PageContainer, ProCard } from '@ant-design/pro-components';
import { EyeFilled, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Skeleton } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { history } from 'umi';
import { deleteSurvey } from '@/services/SurveyService/survey';

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
          // edit
          <EditOutlined key="edit" style={{}} onClick={() => onEdit(surveyType)} />,
          surveyType.status === 'inactive' ? (
            <EyeOutlined
              key="eye"
              style={{ color: '#1890ff' }}
              // deleteSurvey
              onClick={() => {
                deleteSurvey(surveyType.id).then((res) => {
                  if (res.status === 200) {
                    onChange();
                  }
                });
              }}
            />
          ) : (
            <EyeOutlined
              key="eye"
              style={{ color: '#1890ff' }}
              onClick={() => {
                deleteSurvey(surveyType.id).then((res) => {
                  if (res.status === 200) {
                    onChange();
                  }
                });
              }}
            />
          ),
          // nếu status = inactive thì eyeFilled
          // nếu status = active thì eyeOutlined
        ]}
      >
        <Meta
          style={{
            // căn giữa
            height: '150%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          title={'Tên loại khảo sát: ' + surveyType.name}
          onClick={() => onClick(surveyType)}
        />
      </Card>
    </ProCard>
  );
};

export default surveyType;
