import { DeleteOutlined, EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Skeleton, Switch } from 'antd';
import React, { useState, useEffect } from 'react';
const { Meta } = Card;
import SurveyTypeList from './surveylist/component/surveyTypeList';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { history } from 'umi';
import { getSurveyTypeList } from '@/services/SurveyService/survey';
export default (props) => {
  //list data
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [surveyTypeList, setSurveyTypeList] = useState([]);
  const { surveyType } = props;
  useEffect(() => {
    (async () => {
      const listSurveyType = await getSurveyTypeList();
      if (listSurveyType?.data) {
        const listSurveyTypeDataSrc = [];
        listSurveyType.data?.map((item) => {
          const surveyType = {};
          surveyType.id = item.id;
          surveyType.name = item.name;
          listSurveyTypeDataSrc.push(surveyType);
        });
        setDataList(listSurveyTypeDataSrc);
      }
    })();
  }, []);
  console.log('dataList', dataList);
  return (
    <div
      style={{
        background: '#F5F7FA',
      }}
    >
      <PageContainer
        ghost
        header={{
          title: 'Loại khảo sát',
          breadcrumb: {},
        }}
      >
        <ProCard direction="column" ghost gutter={[0, 16]}>
          <SurveyTypeList dataList={dataList} />
        </ProCard>
      </PageContainer>
    </div>
  );
};
