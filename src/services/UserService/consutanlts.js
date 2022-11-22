import request from '@/utils/requestServer';

export const getConsutanlts = async (params) => {
  return await request
    .get('/api/Consultants/Getallconsultant', {
      params: params,
    })
    .then((response) => {
      console.log('response getConsutanlts', response);

      return response;
    })
    .catch((error) => {
      console.log('errorGetConsutanlts', error);
    });
};

export const editConsutanlt = (body) => {
  return request.put('/api/Consultants/update', { data: body });
};

export const getAConsutanlt = async (userId) => {
  return await request
    .get(`api/Consultants/getbyid?id=${userId}`)
    .then((res) => {
      return res.data[0];
    })
    .catch((error) => {
      console.log('errorGetAConsutanlt', error);
    });
};
///api/Specializations/getbyconsultantid
export const getSpecializations = async (userId) => {
  return await request
    .get(`api/Specializations/getbyconsultantid?id=${userId}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log('errorGetSpecializations', error);
    });
};

///api/Specializations/createbylist
export const createSpecializations = (body) => {
  return request.post('/api/Specializations/createbylist', { data: body });
};
