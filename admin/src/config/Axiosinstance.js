import axios from "axios"

let Axios = axios.create({
    baseURL: 'http://localhost:4000/admin',
    headers: {
        'Content-Type': 'application/json'
        }
})

export default Axios