import request from '@/utils/requestServer';

// /api/SurveyTypes/getallsurveytype

export const getSurveyTypeList = (body) => {
  return request.get('api/SurveyTypes/getallsurveytype');
};

///api/SurveyTypes/{id}

export const getASurveyType = async (zodiacId) => {
  return await request.get(`api/SurveyTypes/${zodiacId}`).then((res) => {
    console.log('A');
    return res;
  });
};

////api/Surveys/getsurveybysurveytypeid?surveytypeid=1

export const getSurveyBySurveyTypeId = async (surveyTypeId) => {
  return await request
    .get(`api/Surveys/getsurveybysurveytypeid?surveytypeid=${surveyTypeId}`)
    .then((res) => {
      console.log('B');
      return res;
    });
};

// /api/SurveyTypes/create

export const createSurveyType = (body) => {
  return request.post('api/SurveyTypes/create', { data: body });
};

///api/Surveys/getallsurvey

export const getSurveyList = (body) => {
  return request.get('api/Surveys/getallsurvey');
};

// /api/Surveys/create

export const createSurvey = (body) => {
  return request.post('api/Surveys/create', { data: body });
};

///api/Questions/getquestionbysurveyid?surveyid=1

export const getQuestionBySurveyId = async (surveyId) => {
  return await request
    .get(`api/Questions/getquestionbysurveyid?surveyid=${surveyId}`)
    .then((res) => {
      console.log('C');
      return res;
    });
};
