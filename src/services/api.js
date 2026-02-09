
import axios from 'axios'

const api = axios.create({
    baseURL: "https://appointments-backend-ae8k.onrender.com/"
})

export default api
