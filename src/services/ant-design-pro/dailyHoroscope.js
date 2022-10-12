import request from '@/utils/requestServer';

export const getDailyHoroscopes = async () => {
  return await request.get('/api/DailyHoroscopes/Getalldailyhoroscopes').then((response) => {
    return response.data;
  });
};
