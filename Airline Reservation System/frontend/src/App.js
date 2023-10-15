import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";

// import Aircraft_Model_Add from "./pages/Aircraft_Model_Add";
// import Aircraft_Model from "./pages/Aircraft_Model";
// import Aircraft_Model_Update from "./pages/Aircraft_Model_Update";
import Home from "./pages/Home"
import SearchBox from "./pages/SearchBox";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Aircraft from "./pages/Aircraft"
import "./style.css";
import Booking from "./pages/Booking";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/booking" element={<Booking/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>

        <Route path="/aircraft" element={<Aircraft/>}/>
        
        {/* <Route path="/aircract_models_add" element={<Aircraft_Model_Add/>}/> 
        <Route path="/aircract_models_update" element={<Aircraft_Model_Update/>}/>   */}
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
