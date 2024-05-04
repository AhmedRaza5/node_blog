import axios from "axios";
// import meta 

// const env_variables = import.meta.env
// console.log(env_variables.VITE_APP_API_URL)

const axios_instance = axios.create({
    baseURL:import.meta.env.VITE_APP_API_URL
})







export default axios_instance