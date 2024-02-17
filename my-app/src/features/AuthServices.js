import axios from 'axios'
import { base_url } from '../utils/base_url';


const VITE_PUBLIC_URL   =import.meta.env.VITE_API_URL
const API = axios.create({baseURL:base_url});
API.interceptors.request.use((req)=>{
   if(localStorage.getItem('customer')){
    req.headers.authorization =`Bearer ${
        JSON.parse(localStorage.getItem("customer")).token
    }`
   }
   return req;
})
const createuser = async(userData) =>{
    console.log(userData);
    const response = await axios.post(`${VITE_PUBLIC_URL}/saveuser`,userData)
    console.log(response);
    return await response.data
}
const login = async(user)=>{
    const response = await API.post(`${VITE_PUBLIC_URL}/login`,user)
    console.log(response.data)
   
    if(response.data.message !=="" && response.data.token !==undefined){
        localStorage.setItem('customer',JSON.stringify(response.data))
     
    }
    return await response.data
   
}
const getUser = async(id)=>{
   const response = await API.get(`${VITE_PUBLIC_URL}/user/${id}`)
   console.log(response.data)
   return await response.data
  
}

 const forgotPassword = async(mail)=>{
    const response = await API.post(`${VITE_PUBLIC_URL}/forgot-password`,mail)
    return await response.data
 }

 const updateUser = async(data)=>{
   console.log(data)
    const response = await API.put(`${VITE_PUBLIC_URL}/user-update`,data)
    return await response.data 
 }
 const updateSimpleUser = async(data)=>{
   console.log(data)
    const response = await API.put(`${VITE_PUBLIC_URL}/update-simple-user/${data.id}`,data.dataUser)
    return await response.data 
 }
 const resetpassword = async(data)=>{
    console.log(data)
    const response = await API.post(`${VITE_PUBLIC_URL}/reset-password/${data.token}`,{password:data.dataUser})
    return await response.data
 }

const getusers = async()=>{
    
    const response = await API.get(`${VITE_PUBLIC_URL}/users`)
    console.log(response.data )
    return await response.data
 }


const createCode = async(data)=>{
   console.log(data)
   const response = await API.post(`${VITE_PUBLIC_URL}/auth2f`,data)
   return response.data
}
const verification2f = async(data)=>{
   console.log(data)
   const response = await API.post(`${VITE_PUBLIC_URL}/verif2f`,data)

      console.log(response)
      localStorage.setItem('customer',JSON.stringify(response.data))
      return response.data
}
const verifyPassword = async(data)=>{
   console.log(data)
   const response = await API.post(`${VITE_PUBLIC_URL}/verify-password`,data)
   return response.data
}
const deleteUser = async(id)=>{
   console.log(id)
   const response = await API.delete(`${VITE_PUBLIC_URL}/delete-user/${id}`)
   return response.data
}

const activateDesactivateAccountUser = async(id)=>{
   console.log(id)
   const response = await API.post(`${VITE_PUBLIC_URL}/activate-desactivate-account/${id}`)
   return response.data
}
const searchUser = async (query)=>{
   const response = await API.get(`${VITE_PUBLIC_URL}/search?searchQuery=${query}`)
   return await response.data
}
const authServices = {
   searchUser, activateDesactivateAccountUser,   deleteUser,   updateSimpleUser,  verifyPassword,verification2f, createCode, getUser,createuser,login,forgotPassword,updateUser,resetpassword,getusers
}
export default authServices

