import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/AuthSlices'
import catReducer from '../features/categorySlice'
import recetteReducer from '../features/recetteSlice'

export const store = configureStore({
  reducer: {
  
    auth:authReducer,
    cat:catReducer,
    recette:recetteReducer
  
  }
})
