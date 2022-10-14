import request from '@/utils/requestServer';

export const addProfile = (body) => {
  return request.post('/api/Profiles/create', { data: body });
};

export const getProfiles = async (customerId) => {
  return await request
    .get('/api/Profiles/getbyidcustomer', {
      params: {
        id: customerId,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log('errorGetProfiles', error);
    });
};

export const deleteProfile = (profileId) => {
  return request.delete(`/api/Profiles/${profileId}`);
};

export const getAnProfile = async (profileId) => {
  return await request
    .get('/api/Profiles/getbyid', {
      params: {
        id: profileId,
      },
    })
    .then((res) => {
      return res.data[0];
    })
    .catch((error) => {
      console.log('errorGetAnProfile', error);
    });
};

export const updateProfile = async (body) => {
  return await request.put('/api/Profiles/update', {
    data: body,
  });
};
