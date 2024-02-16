

import {createAction, createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import crecetteservice from  './recetteService'

import {  toast } from 'react-toastify';

const initistialState ={
recettes:[],
isSuccess:false,
isError:false,
isLoading:false,
message:""
} 
export const registreRecette = createAsyncThunk('/create/recette',async(data,thunkAPI)=>{
    try {
       return await crecetteservice.createRecette(data)  
    } catch (error) {
      return thunkAPI.rejectWithValue(error)  
    }
})
export const recettes = createAsyncThunk('/recette',async(thunkAPI)=>{
    try {
       return await crecetteservice.recettes()  
    } catch (error) {
      return thunkAPI.rejectWithValue(error)  
    }
})
export const logOut = createAction('/logout')
export const resetMessage = createAction('/resetmessage') 
export const resetVerifPassword = createAction('resetpasswordVerify')
export const recetteSlice = createSlice({
    name:'recette',
    initialState:initistialState,
    reducers:{},
    extraReducers:(builder)=>{
       builder.addCase(registreRecette.pending,(state)=>{
        state.isLoading=true
        state.message=""
       })
       .addCase(registreRecette.fulfilled,(state,action)=>{
        state.isLoading=false
        state.isSuccess=true
        state.recettes = [...state.recettes , action.payload.newRecette,]
        console.log(action.payload)
        state.message = action.payload.message
        toast.success(action.payload.message)
       })
       .addCase(registreRecette.rejected,(state,action)=>{
        console.log(action.payload)
        state.isLoading=false
        state.isSuccess=false
        state.isError=true
        state.message=action.payload.response.data.message
        toast.error(action.payload.response.data.message)
       })  
       .addCase(recettes.pending,(state)=>{
        state.isLoading=true
        state.message=""
       })
       .addCase(recettes.fulfilled,(state,action)=>{
        state.isLoading=false
        state.isSuccess=true
        state.recettes =  action.payload
        console.log(action.payload)
        state.message = action.payload.message
        toast.success(action.payload.message)
       })
       .addCase(recettes.rejected,(state,action)=>{
        console.log(action.payload)
        state.isLoading=false
        state.isSuccess=false
        state.isError=true
        state.message=action.payload.response.data.message
        toast.error(action.payload.response.data.message)
       })  
    }

})
export default recetteSlice.reducer;