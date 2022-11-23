import request from '@/utils/requestServer';

export const getCustomers = async (params) => {
  return await request
    .get(`/api/Customers/Getallcustomer${params ? `?search=${params}` : ''}`)
    .then((response) => {
      console.log('response getUsers', response);

      return response.data;
    })
    .catch((error) => {
      console.log('errorGetUsers', error);
    });
};
export const editCustomer = (body) => {
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

export const getAnCustomer = async (userId) => {
  return await request
    .get(`/api/Customers/getbyid?id=${userId}`)
    .then((res) => {
      return res.data[0];
    })
    .catch((error) => {
      console.log('errorGetAnUser', error);
    });
};
// https://psycteam.azurewebsites.net/api/SpecializationTypes/getallspecype?search=gg
export const getSpecializationTypes = async (params) => {
  return await request.get('/api/SpecializationTypes/getallspecype').then((res) => {
    console.log('response getSpecializationTypes', res);
    return res.data;
  });
};
// https://psycteam.azurewebsites.net/api/SpecializationTypes/update/5
export const editSpecializationTypes = (body) => {
  return request.put('api/SpecializationTypes/update', { data: body });
};
//https://psycteam.azurewebsites.net/api/SpecializationTypes/4
export const getASpecializationTypes = (id) => {
  return request.get(`/api/SpecializationTypes/${id}`);
};
