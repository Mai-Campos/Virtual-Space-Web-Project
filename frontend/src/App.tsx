import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Footer from "./components/Footer"
import Catalog from "./pages/Catalog"

function App() {

  return (
    
     <BrowserRouter>
      <Navbar/>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/catalog" element = {<Catalog/>}></Route>
      </Routes>

      <Footer/>
     </BrowserRouter>
    
  )
}

export default App
