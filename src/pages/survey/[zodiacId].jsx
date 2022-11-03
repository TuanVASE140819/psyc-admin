import React, { useEffect, useState } from 'react';

import { Content } from 'antd/lib/layout/layout';
import { getASurveyType } from '@/services/SurveyService/survey';
import { getSurveyBySurveyTypeId } from '@/services/SurveyService/survey';
import ShortZodiacDetail from './component/ShortZodiacDetail';
import ZodiacDetail from './component/ZodiacDetail';
import ZodiacHouse from './component/ZodiacHouse';
import DailyHoroscope from './component/DailyHoroscope';

import SurveyList from './component/SurveyList';

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

  console.log('dataList', dataList);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const survey = await getSurveyBySurveyTypeId(zodiacId);
        setSurvey(survey);
        setDataList(survey);
      } catch (error) {
        console.log('errorLoadDetailZodiac', error);
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
        <SurveyList dataList={dataList} />
      </Content>
    </>
  );
};

export default DetailZodiac;
