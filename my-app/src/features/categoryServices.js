import axios from 'axios'


const VITE_PUBLIC_URL   =import.meta.env.VITE_API_URL
const API = axios.create({baseURL:VITE_PUBLIC_URL});
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
    const response = await API.post(`${VITE_PUBLIC_URL}/create-cat`,categoryData)
    console.log(response);
    return await response.data
}
const categories = async() =>{
    
    const response = await API.get(`${VITE_PUBLIC_URL}/categories`)
    console.log(response);
    return await response.data
}
const catServices = {
    createcat,categories
}
export default catServices

