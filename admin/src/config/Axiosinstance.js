import axios from "axios"

let Axios = axios.create({
    baseURL: 'https://admin.hotelova.site/server/admin',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
})

Axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization=token;
    }
    return config;
});
  
Axios.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    return Promise.reject(error);
  });

export default Axios
