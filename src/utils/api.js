import axios from 'axios';

const baseUrl = 'https://api.themoviedb.org/3';
const token = import.meta.env.VITE_APP_API_ACCESS_TOKEN;

const fetchDataFromApi = (endpoint) => {
   const url = `${baseUrl}/${endpoint}`;
   const options = {
      method: 'GET',
      headers: {
         accept: 'application/json',
         Authorization: `Bearer ${token} `,
      },
   };

   return axios
      .get(url, options)
      .then((response) => {
         return response.data;
      })
      .catch((error) => {
         throw new Error('Error fetching movies:', error);
      });
};

export default fetchDataFromApi;
