import {createAction, createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import catservice from  './categoryServices'

import {  toast } from 'react-toastify';

const initistialState ={
category:[],
isSuccess:false,
isError:false,
isLoading:false,
message:""
} 
export const registreCat = createAsyncThunk('/create/category',async(data,thunkAPI)=>{
    try {
       return await catservice.createcat(data)  
    } catch (error) {
      return thunkAPI.rejectWithValue(error)  
    }
})
export const categories = createAsyncThunk('/get/categories',async(thunkAPI)=>{
    try {
       return await catservice.categories()  
    } catch (error) {
      return thunkAPI.rejectWithValue(error)  
    }
})
export const logOut = createAction('/logout')
export const resetMessage = createAction('/resetmessage') 
export const resetVerifPassword = createAction('resetpasswordVerify')
export const catSlice = createSlice({
    name:'cat',
    initialState:initistialState,
    reducers:{},
    extraReducers:(builder)=>{
       builder.addCase(registreCat.pending,(state)=>{
        state.isLoading=true
        state.message=""
       })
       .addCase(registreCat.fulfilled,(state,action)=>{
        state.isLoading=false
        state.isSuccess=true
        state.category = [...state.category , action.payload.newtitle,]
        console.log(action.payload)
        state.message = action.payload.message
        toast.success(action.payload.message)
       })
       .addCase(registreCat.rejected,(state,action)=>{
        console.log(action.payload)
        state.isLoading=false
        state.isSuccess=false
        state.isError=true
        state.message=action.payload.response.data.message
        toast.error(action.payload.response.data.message)
       })  
       .addCase(categories.pending,(state)=>{
        state.isLoading=true
        state.message=""
       })
       .addCase(categories.fulfilled,(state,action)=>{
        state.isLoading=false
        state.isSuccess=true
        console.log(action.payload)
        state.category = action.payload
        
        state.message = action.payload.message
        toast.success(action.payload.message)
       })
       .addCase(categories.rejected,(state,action)=>{
        console.log(action.payload)
        state.isLoading=false
        state.isSuccess=false
        state.isError=true
        state.message=action.payload.response.data.message
        toast.error(action.payload.response.data.message)
       })  
    }

})
export default catSlice.reducer;