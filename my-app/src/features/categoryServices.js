import axios from 'axios'
import { base_url } from '../utils/base_url';

const API = axios.create({baseURL:base_url});
API.interceptors.request.use((req)=>{
   if(localStorage.getItem('customer')){
    req.headers.authorization =`Bearer ${
        JSON.parse(localStorage.getItem("customer")).token
    }`
   }
   return req;
})
const createcat = async(categoryData) =>{
    console.log(categoryData);
    const response = await API.post(`${base_url}/create-cat`,categoryData)
    console.log(response);
    return await response.data
}
const categories = async() =>{
    
    const response = await API.get(`${base_url}/categories`)
    console.log(response);
    return await response.data
}
const catServices = {
    createcat,categories
}
export default catServices

