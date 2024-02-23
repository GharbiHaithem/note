import axios from 'axios'

const VITE_PUBLIC_URL   ="https://server-n.onrender.com/api"
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
    console.log("Avant API.put :", data);
const response = await API.put(`${VITE_PUBLIC_URL}/upload/`,data,{
    headers:{
        Authorization:`Bearer ${getTokenFromLocalStorage.token}`,
        
        Accept: "application/json",
      
        'Content-Type': 'multipart/form-data',
    }
})
console.log("Après API.put :", response.data);
return response.data
} 




const deleteImages = async(id)=>{
const response = await API.delete(`${VITE_PUBLIC_URL}/delete-img/${id}`)
console.log(id)
return response.data
}
const uploadServices = {
    uploadImages,deleteImages
}
export default uploadServices