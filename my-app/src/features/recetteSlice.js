

import {createAction, createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import crecetteservice from  './recetteService'

import {  toast } from 'react-toastify';

const initistialState ={
recettes:[],
isSuccess:false,
isError:false,
isLoading:false,
message:"",
totalRecords:0
} 
export const registreRecette = createAsyncThunk('/create/recette',async(data,thunkAPI)=>{
    try {
       return await crecetteservice.createRecette(data)  
    } catch (error) {
      return thunkAPI.rejectWithValue(error)  
    }
})
export const recettes = createAsyncThunk('/recette',async(searchQuery,thunkAPI)=>{
    try {
       return await crecetteservice.recettes(searchQuery)  
    } catch (error) {
      return thunkAPI.rejectWithValue(error)  
    }
})
export const editRecette = createAsyncThunk('/recette-edit',async(data,thunkAPI)=>{
  try {
     return await crecetteservice.editRecette(data)  
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
        state.recettes = action.payload.recettes
        console.log(action.payload)
        state.message = action.payload.message
        toast.success(action.payload.message)
state.totalRecords = action.payload.totalRecords

       })
       .addCase(recettes.rejected,(state,action)=>{
        console.log(action.payload)
        state.isLoading=false
        state.isSuccess=false
        state.isError=true
        state.message=action.payload.response.data.message
        toast.error(action.payload.response.data.message)
       })  
       .addCase(editRecette.pending,(state)=>{
        state.isLoading=true
        state.message=""
       })
       .addCase(editRecette.fulfilled,(state,action)=>{
        state.isLoading=false
        state.isSuccess=true
        state.recetteEdited = action.payload
        const updatedRecetteIndex = state.recettes.findIndex(
          (recette) => recette._id === action.payload.updatedRecette._id
        );
        console.log(updatedRecetteIndex)
        console.log(action.payload)
        state.message = action.payload.message
        toast.success(action.payload.messaqe)
        if (updatedRecetteIndex !== -1) {
          state.recettes[updatedRecetteIndex] = action.payload.updatedRecette;
        }

       })
       .addCase(editRecette.rejected,(state,action)=>{
        console.log(action.payload)
        state.isLoading=false
        state.isSuccess=false
        state.isError=true
        state.message=action.payload
        toast.error(action.payload.response.data.message)
       }) 
    }

})
export default recetteSlice.reducer;