import axios from 'axios';

const accessToken =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MjAzNzhmOTdiMjkwYmMyNDdmNDNiNWY5MmRlNGMyNyIsInN1YiI6IjY2MGEzNjI1YTg4NTg3MDE3Y2U1NDRmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h8u7zvn5gbnMNpSAy1VDzXKHkfcPJUF7QUdDiKQjdkk';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: accessToken,
  },
};

export const getAPI = async url => {
  const response = await axios.get(url, {
    headers: {
      accept: 'application/json',
      Authorization: accessToken,
    },
  });
  return response;
};
