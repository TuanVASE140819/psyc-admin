import React, { useEffect, useState } from 'react';

import { Content } from 'antd/lib/layout/layout';
import { getASurveyType } from '@/services/SurveyService/survey';
import { getSurveyBySurveyTypeId } from '@/services/SurveyService/survey';
import ShortZodiacDetail from './component/SurveyType';
import SurveyList from './component/SurveyList';
import QuestionList from './component/QuestionList';

const DetailZodiac = (props) => {
  const {
    history: {},
    match: {
      params: { zodiacId },
    },
  } = props;

  const [dataList, setDataList] = useState([]);

  const [zodiac, setZodiac] = useState({});
  const [survey, setSurvey] = useState({});
  const [loading, setLoading] = useState(true);
  const [triggerLoadZodiac, setTriggerLoadZodiac] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const zodiac = await getASurveyType(zodiacId);
        setZodiac(zodiac);
      } catch (error) {
        console.log('errorLoadDetailZodiac', error);
      }
      setLoading(false);
    })();
  }, [triggerLoadZodiac]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const listSurvey = await getSurveyBySurveyTypeId(zodiacId);
      if (listSurvey?.data) {
        const listSurveyDataSrc = [];
        listSurvey.data?.map((item) => {
          const survey = {};
          survey.id = item.id;
          survey.name = item.name;
          listSurveyDataSrc.push(survey);
        });
        setDataList(listSurveyDataSrc);
      }
      setLoading(false);
    })();
  }, [triggerLoadZodiac]);

  const handleTriggerLoadZodiac = () => {
    setTriggerLoadZodiac(!triggerLoadZodiac);
  };

  return (
    <>
      <Content
        style={{
          padding: '0px 200px',
        }}
      >
        <ShortZodiacDetail zodiac={zodiac} />
        <QuestionList dataList={dataList} />
      </Content>
    </>
  );
};

export default DetailZodiac;
