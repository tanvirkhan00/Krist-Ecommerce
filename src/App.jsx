import { createRoutesFromElements, Route } from "react-router"
import RootLayout from "./Components/RootLayout/RootLayout"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./Pages/Home"
import SignUp from "./Pages/SignUp"
import Login from "./Pages/Login"
import Shop from "./Pages/Shop"
import ProductDetails from "./Pages/ProductDetails"
import FilterCategory from "./Pages/FilterCategory"



function App() {

  let router = createBrowserRouter(createRoutesFromElements(
    <Route element={<RootLayout />} >
      <Route path="/" element={<Home />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/logIn" element={<Login />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/category/:categoryName" element={<FilterCategory />} />
    </Route>
  ))

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
