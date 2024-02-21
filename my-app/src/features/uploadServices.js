import axios from 'axios'

const VITE_PUBLIC_URL   ="https://server-n.onrender.com"
const API = axios.create({baseURL:VITE_PUBLIC_URL});
API.interceptors.request.use((req)=>{
   if(localStorage.getItem('customer')){
    req.headers.authorization =`Bearer ${
        JSON.parse(localStorage.getItem("customer")).token
    }`
   }
   return req;
})
const getTokenFromLocalStorage = localStorage.getItem('customer') ? JSON.parse(localStorage.getItem('customer')) : {}
const uploadImages = async(data)=>{
const response = await API.put(`${VITE_PUBLIC_URL}/api/upload/`,data,{
    headers:{
        Authorization:`Bearer ${getTokenFromLocalStorage.token}`,
        Accept:"application/json"
    }
})
console.log(data)
return response.data
} 




const deleteImages = async(id)=>{
const response = await API.delete(`${VITE_PUBLIC_URL}/delete-img/${id}`)
console.log(response)
return response.data
}
const uploadServices = {
    uploadImages,deleteImages
}
export default uploadServices