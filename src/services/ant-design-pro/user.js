import request from '@/utils/requestServer';

export const getUsers = async (params) => {
  return await request
    .get('/api/Customers/Getallcustomer', {
      params: params,
    })
    .then((response) => {
      console.log('response getUsers', response);

      return response.data;
    })
    .catch((error) => {
      console.log('errorGetUsers', error);
    });
};

export const addUser = (body) => {
  return request.post('/api/v1/users', { data: body });
};

export const editUser = (body) => {
  return request.put('api/Customers/update', { data: body });
};
export const login = async (body) => {
  return await request.post('/api/FirebaseServices/loginadmin', {
    data: body,
  });
};
export const getCurrentUser = async () => {
  return await request.get('/api/v1/users/current');
};

export const getAnUser = async (userId) => {
  return await request
    .get(`/api/Customers/getbyid?id=${userId}`)
    .then((res) => {
      return res.data[0];
    })
    .catch((error) => {
      console.log('errorGetAnUser', error);
    });
};

// export const searchUser = (params) => {
//   return request
//     .get('/api/User', {
//       params: params,
//     })
// }
