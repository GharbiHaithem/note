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
const createRecette = async(recetteData) =>{
    console.log(recetteData);
    const response = await API.post(`${VITE_PUBLIC_URL}/api/create-recette`,recetteData)
    console.log(response);
    return await response.data
}
const recettes = async(limit) =>{
    console.log(limit);
    const response = await API.get(`${VITE_PUBLIC_URL}/api/recettes`)
   
    return await response.data
}

const editRecette = async(data) =>{
    console.log(data)
    const response = await API.put(`${VITE_PUBLIC_URL}/api/edit/${data.id}`,{description:data.description,title:data.title})
   
    return await response.data
}
const recetteServices = {
    createRecette,recettes,editRecette
}
export default recetteServices