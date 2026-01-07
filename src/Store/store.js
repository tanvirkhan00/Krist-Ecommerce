import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../Components/Slice/productSlice'

export default configureStore({
  reducer: {
    product: productReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for Firebase objects
        ignoredActions: ['product/clientAccount'],
        // Ignore these paths in the state
        ignoredPaths: ['product.Account'],
      },
    }),
})