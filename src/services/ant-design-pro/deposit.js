import request from '@/utils/requestServer';

// https://psycteam.azurewebsites.net/api/Deposits/Getalldeposit?date=2022&walletid=1&pagesize=5&pagenumber=1
export const getDeposits = async (params) => {
  return await request
    .get('/api/Deposits/Getalldeposit', {
      params,
    })
    .then((response) => {
      return response.data;
      console.log('api deposit', response);
    });
};
