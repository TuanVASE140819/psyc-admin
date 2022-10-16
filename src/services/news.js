import request from '@/utils/requestServer';

export const addNews = (body) => {
  return request.post('/api/Articles/create', { data: body });
};

export const getNews = async (params) => {
  return await request
    .get('/api/Articles/GetallArticles', {
      params: params,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log('errorGetNews', error);
    });
};

export const deleteNews = (newsId) => {
  return request.delete(`/api/Articles/${newsId}`);
};

export const getAnNews = async (newsId) => {
  return await request
    .get(`/api/Articles/getbyid?id=${newsId}`)
    .then((res) => {
      return res.data[0];
    })
    .catch((error) => {
      console.log('errorGetAnNews', error);
    });
};

export const updateNews = (body) => {
  return request.put('/api/Articles/update', {
    data: body,
  });
};
