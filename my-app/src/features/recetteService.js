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
const createRecette = async(recetteData) =>{
    console.log(recetteData);
    const response = await API.post(`${base_url}/create-recette`,recetteData)
    console.log(response);
    return await response.data
}
const recettes = async() =>{
  
    const response = await API.get(`${base_url}/recettes`)
    console.log(response);
    return await response.data
}
const recetteServices = {
    createRecette,recettes
}
export default recetteServices