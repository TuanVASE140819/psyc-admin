import request from '@/utils/requestServer';

export const getPlanetZodiacs = async (id) => {
  return await request
    .get('/api/ZodiacPlanets/getbyid', {
      params: {
        id,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log('errorGetPlanetZodiacs', error);
    });
};

export const addPlanetZodiac = (planetName, planetId, body) => {
  return request.post(`/api/v1/planets/${planetName}-${planetId}/zodiacs`, {
    data: body,
  });
};

export const updatePlanetZodiac = async (planetName, planetId, planetZodiacId, body) => {
  return await request.put(`/api/v1/planets/${planetName}-${planetId}/zodiacs`, {
    params: {
      id: planetZodiacId,
    },
    data: body,
  });
};

export const getAnPlanetZodiac = async (planetName, planetId, planetZodiacId) => {
  return await request
    .get(`/api/v1/planets/${planetName}-${planetId}/zodiacs/${planetZodiacId}`)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log('errorGetAnPlanetZodiac', error);
    });
};
