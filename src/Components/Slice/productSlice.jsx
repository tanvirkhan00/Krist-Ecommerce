import { createSlice } from '@reduxjs/toolkit'

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    CartItem: localStorage.getItem("cart")? JSON.parse(localStorage.getItem("cart")):[],
  },
  reducers: { 
        addToCart:((state, action) => {
          let find =state.CartItem.findIndex((item) => item.id == action.payload)
          
          if( find == -1 ) {
            state.CartItem = [...state.CartItem, action.payload]
            localStorage.setItem("cart"), JSON.stringify(state.CartItem)
          } else {
            state.CartItem[find].qty += 1
            localStorage.setItem("cart", JSON.stringify(state.CartItem))
          }
        }),
        deletProduct:((state, action) => {
          state.CartItem.splice(action.payload, 1)
          localStorage.setItem("cart", JSON.stringify(state.CartItem))
        }) 
  }
 
})

// Action creators are generated for each case reducer function
export const { addToCart, deletProduct } = productSlice.actions

export default productSlice.reducer