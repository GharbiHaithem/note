import {createAction, createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import uploadServices from './uploadServices'

const initialState = {
    images :[],
    isLoading:false,
    isError:false,
    isSuccess:false,
    message:''
}
export const upload = createAsyncThunk('/upload', async(data,thunkAPI)=>{
    try{
        const formData =new FormData()
        for(let i =0 ; i<data.length ;i++){
            formData.append('images',data[i])
        }
        return await uploadServices.uploadImages(formData)
    }catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})
// export const upload = createAsyncThunk('/upload', async (data, thunkAPI) => {
//     try {
//         const formData = new FormData();

//         for (let i = 0; i < data.length; i++) {
//             const image = data[i];
//             const removedBackgroundImage = await removeBackground(image);
//             console.log(removedBackgroundImage);
//             formData.append('images', removedBackgroundImage); // Utilisez la même clé 'images' que dans le service d'upload
    
//         }

//         return await uploadServices.uploadImages(formData);
//     } catch (err) {
//         return thunkAPI.rejectWithValue(err);
//     }
// });
// export const removeBackground = async (image) => {
//     const formData = new FormData();
//     formData.append('image_file', image); // Utilisez 'image_file' au lieu de 'images'

//     const config = {
//         headers: {
//             'X-Api-Key': "EFyLf991B2Yg6NnA1gDDGxbv",
//         },
//         responseType: 'arraybuffer',
//         encoding: null
//     };

//     try {
//         const response = await axios.post('https://api.remove.bg/v1.0/removebg', formData, config);
//         const blobData = new Blob([response.data], { type: 'image/png' }); // Assurez-vous de spécifier le type correct
//         return blobData;
//     } catch (error) {
//         console.error('Remove.bg error:', error.response?.data || error.message);
//         throw error;
//     }
// };
// export const upload = createAsyncThunk('/upload', async (data, thunkAPI) => {
//     const formData = new FormData();

//     for (let i = 0; i < data.length; i++) {
//         const image = data[i];
//         const removedBackgroundImage = await removeBackground(image);
//         formData.append('images', removedBackgroundImage); 
//     }

//     try {
//         return await uploadServices.uploadImages(formData);
//     } catch (err) {
//         return thunkAPI.rejectWithValue(err);
//     }
// });

// export const removeBackground = async (image) => {
//     const formData = new FormData();
//     formData.append('image_file', image);

//     const config = {
//         headers: {
//             'X-Api-Key': "EFyLf991B2Yg6NnA1gDDGxbv",
//         },
//         responseType: 'arraybuffer',
//         encoding: null
//     };

//     try {
//         const response = await axios.post('https://api.remove.bg/v1.0/removebg', formData, config);
//         let fileType = 'image/png'; // Par défaut, on suppose que c'est du PNG

//         // Vérifiez le type de fichier à partir de la réponse pour ajuster le type si nécessaire
//         if (response.headers['content-type'] === 'image/jpeg') {
//             fileType = 'image/jpeg';
//         }

//         const blobData = new Blob([response.data], { type: fileType });
//         return blobData;
//     } catch (error) {
//         console.error('Remove.bg error:', error.response?.data || error.message);
//         throw error;
//     }
// };

export const deleteImg = createAsyncThunk('/delete-img',async(id,thunkAPI)=>{
    try {
     return await uploadServices.deleteImages(id)   
    } catch (error) {
     return thunkAPI.rejectWithValue(error)   
    }
})

export const resetUpload = createAction('resetupload')
export const uploadSlice = createSlice({
    name:'upload',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(upload.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(upload.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess=true
            state.images=action.payload
        })
        .addCase(upload.rejected,(state,action)=>{
            console.log(action.payload);
            state.isLoading=false
            state.isSuccess=false
            state.isError=true
            state.message=action.error
            state.images=[]
        })
        builder.addCase(deleteImg.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(deleteImg.fulfilled,(state,action)=>{
            state.isLoading = false
            console.log(action.payload)
            state.isSuccess=true
            state.images=[]
        })
        .addCase(deleteImg.rejected,(state,action)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isError=true
            state.message=action.error
            state.images=[]
        })
        .addCase(resetUpload,()=>initialState)
    }
})
export default uploadSlice.reducer