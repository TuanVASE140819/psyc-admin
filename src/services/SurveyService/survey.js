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

///https://psycteam.azurewebsites.net/api/Surveys/getsurveybysurveytypeidbyadmin?surveytypeid=1

export const getSurveyBySurveyTypeId = async (surveyTypeId) => {
  return await request
    .get(`api/Surveys/getSurveyBySurveyTypeIdByAdmin?surveyTypeId=${surveyTypeId}`)
    .then((res) => {
      console.log('B');
      return res;
    });
};

///api/Questions/getquestionbysurveyid
export const getQuestionBySurveyId = async (surveyId) => {
  return await request
    .get(`api/Questions/getquestionbysurveyid?surveyid=${surveyId}`)
    .then((res) => {
      console.log('C');
      return res;
    });
};

//https://psycteam.azurewebsites.net/api/OptionQuestions/getoptionbyquestionid?questionid=1
export const getOptionByQuestionId = async (questionId) => {
  return await request
    .get(`api/OptionQuestions/getoptionbyquestionid?questionid=${questionId}`)
    .then((res) => {
      console.log('D');
      return res;
    });
};

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
