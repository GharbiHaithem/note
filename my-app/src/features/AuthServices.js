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
const createuser = async(userData) =>{
    console.log(userData);
    const response = await axios.post(`${base_url}/saveuser`,userData)
    console.log(response);
    return await response.data
}
const login = async(user)=>{
    const response = await API.post(`${base_url}/login`,user)
    console.log(response.data)
   
    if(response.data.message !=="" && response.data.token !==undefined){
        localStorage.setItem('customer',JSON.stringify(response.data))
     
    }
    return await response.data
   
}
const getUser = async(id)=>{
   const response = await API.get(`${base_url}/user/${id}`)
   console.log(response.data)
   return await response.data
  
}

 const forgotPassword = async(mail)=>{
    const response = await API.post(`${base_url}/forgot-password`,mail)
    return await response.data
 }

 const updateUser = async(data)=>{
   console.log(data)
    const response = await API.put(`${base_url}/user-update`,data)
    return await response.data 
 }
 const updateSimpleUser = async(data)=>{
   console.log(data)
    const response = await API.put(`${base_url}/update-simple-user/${data.id}`,data.dataUser)
    return await response.data 
 }
 const resetpassword = async(data)=>{
    console.log(data)
    const response = await API.post(`${base_url}/reset-password/${data.token}`,{password:data.dataUser})
    return await response.data
 }

const getusers = async()=>{
    
    const response = await API.get(`${base_url}/users`)
    console.log(response.data )
    return await response.data
 }


const createCode = async(data)=>{
   console.log(data)
   const response = await API.post(`${base_url}/auth2f`,data)
   return response.data
}
const verification2f = async(data)=>{
   console.log(data)
   const response = await API.post(`${base_url}/verif2f`,data)

      console.log(response)
      localStorage.setItem('customer',JSON.stringify(response.data))
      return response.data
}
const verifyPassword = async(data)=>{
   console.log(data)
   const response = await API.post(`${base_url}/verify-password`,data)
   return response.data
}
const deleteUser = async(id)=>{
   console.log(id)
   const response = await API.delete(`${base_url}/delete-user/${id}`)
   return response.data
}

const activateDesactivateAccountUser = async(id)=>{
   console.log(id)
   const response = await API.post(`${base_url}/activate-desactivate-account/${id}`)
   return response.data
}
const searchUser = async (query)=>{
   const response = await API.get(`${base_url}/search?searchQuery=${query}`)
   return await response.data
}
const authServices = {
   searchUser, activateDesactivateAccountUser,   deleteUser,   updateSimpleUser,  verifyPassword,verification2f, createCode, getUser,createuser,login,forgotPassword,updateUser,resetpassword,getusers
}
export default authServices

