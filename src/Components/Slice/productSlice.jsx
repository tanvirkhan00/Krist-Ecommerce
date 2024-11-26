import { createSlice } from '@reduxjs/toolkit'

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    CartItem: localStorage.getItem("cart")? JSON.parse(localStorage.getItem("cart")):[],
    Account: localStorage.getItem("clientId")? JSON.parse(localStorage.getItem("clientId")):[],
  },
  reducers: { 
        addToCart:((state, action) => {
          let findIndex =state.CartItem.findIndex((item) => item.id === action.payload.id)
          
          if( findIndex === -1 ) {
            state.CartItem = [...state.CartItem, action.payload]
            localStorage.setItem("cart", JSON.stringify(state.CartItem))
          } else {
            state.CartItem[findIndex].qty += 1
            localStorage.setItem("cart", JSON.stringify(state.CartItem))
          }
        }),
        deletProduct:((state, action) => {
          state.CartItem.splice(action.payload, 1)
          localStorage.setItem("cart", JSON.stringify(state.CartItem))
        }),
        clientAccount:((state,action) => {
          state.Account(action.payload)
          localStorage.setItem("clientId", JSON.stringify(state.Account))
        }) 

  }
 
})

// Action creators are generated for each case reducer function
export const { addToCart, deletProduct, clientAccount } = productSlice.actions

export default productSlice.reducer