import axios from 'axios'
const Axios = axios.create({
    baseURL: 'http://localhost:4000/users',
    withCredentials: true,
})

export default Axios
