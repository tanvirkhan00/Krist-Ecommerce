import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../Components/Slice/productSlice'

export default configureStore({
  reducer: {
    product: productReducer
  },
})