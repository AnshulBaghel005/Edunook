import { Route, Routes } from "react-router-dom"

import Home from "./pages/Home"
import Navbar from "./components/common/Navbar"
import SignupForm from "./components/core/Auth/SignupForm"
import LoginForm from "./components/core/Auth/LoginForm"
import About from "./pages/About"
import Contact from "./pages/Contact"
import VerifyEmail from "./pages/VerifyEmail"
import MyProfile from "./components/core/Dashboard/MyProfile"
import Settings from "./components/core/Dashboard/Settings";
function App() {


  return (
<>
    <div>
     <Navbar/>
    </div>
    <div className="w-screen min-h-screen  bg-black flex flex-col">
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/signup" element={<SignupForm/>}/>
      <Route path="/login" element={<LoginForm/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<Contact/>}/>
      {/* <Route path="catalog/:catalogName" element={<Catalog/>} /> */}
      <Route path="/verify-email" element={<VerifyEmail/>}/>
      <Route path="dashboard/my-profile" element={<MyProfile />} />
      <Route path="dashboard/Settings" element={<Settings />} />


        
    </Routes>
    </div>
  </>
  )
}

export default App
