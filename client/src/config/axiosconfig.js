import axios from 'axios'

const Axios = axios.create({
    baseURL: 'http://www.hotelova.site/server/users',
    withCredentials: true,
})
export default Axios


