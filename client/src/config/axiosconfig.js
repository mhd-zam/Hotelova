import axios from 'axios'

const Axios = axios.create({
    baseURL: 'https://hotelova.site/server/users',
    withCredentials: true,
})
export default Axios


