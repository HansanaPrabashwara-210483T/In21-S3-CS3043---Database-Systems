import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";


import Home from "./pages/Home"
import SearchBox from "./pages/SearchBox";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import Admin from "./pages/Admin/AdminPanel";

import Aircraft from "./pages/Admin/Aircraft/Aircraft"
import Aircraft_Add from "./pages/Admin/Aircraft/AircraftAdd";
import Aircraft_Update from "./pages/Admin/Aircraft/AircraftUpdate";

import AircraftModel from "./pages/Admin/AircraftModel/AircraftModel";
import AircraftModel_Add from "./pages/Admin/AircraftModel/AircraftModelAdd";
import AircraftModel_Update from "./pages/Admin/AircraftModel/AircraftModelUpdate";

import Airport from "./pages/Admin/Airport/Airport";
import Airport_Add from "./pages/Admin/Airport/AirportAdd";
import Airport_Update from "./pages/Admin/Airport/AirportUpdate";

import AirRoute from "./pages/Admin/Route/Route";
import Route_Add from "./pages/Admin/Route/RouteAdd";
import Route_Update from "./pages/Admin/Route/RouteUpdate";

import Location from "./pages/Admin/Location/Location"
import Location_Add from "./pages/Admin/Location/LocationAdd";
import Location_Update from "./pages/Admin/Location/LocationUpdate";

import Flight from "./pages/Admin/Flight/Flight";
import Flight_Add from "./pages/Admin/Flight/FlightAdd"
import Flight_Update from "./pages/Admin/Flight/FlightUpdate"

import BookingList from "./pages/Admin/BookingList/BookingList";
import BookingList_Add from "./pages/Admin/BookingList/BookingListAdd";
import BookingList_Update from "./pages/Admin/BookingList/BookingListUpdate";

import User from "./pages/Admin/User/User";
import AdminPanel from "./pages/Admin/AdminPanel";

import SeatSelect from "./pages/SeatSelect"; 
import Ticket from "./pages/Ticket";

import Shedule from "./pages/Shedule";
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
        <Route path="/shedule" element={<Shedule/>}/>
        <Route path="/seat_select/:flight_id/:customer_id" element={<SeatSelect/>}/>
        <Route path="/ticket/:booking_id" element={<Ticket/>}/>


        <Route path="/admin" element={<Admin/>}/>


        <Route path="/aircraft" element={<Aircraft/>}/>
        <Route path="/aircraft_add" element={<Aircraft_Add/>}/>
        <Route path="/aircraft_update/:id" element={<Aircraft_Update/>}/>


        <Route path="/aircraft_model" element={<AircraftModel/>}/>
        <Route path="/aircraft_model_add" element={<AircraftModel_Add/>}/> 
        <Route path="/aircraft_model_update/:id" element={<AircraftModel_Update/>}/>  

        <Route path="/airport" element={<Airport/>}/>
        <Route path="/airport_add" element={<Airport_Add/>}/> 
        <Route path="/airport_update/:id" element={<Airport_Update/>}/>  


        <Route path="/route" element={<AirRoute/>}/>
        <Route path="/route_add" element={<Route_Add/>}/> 
        <Route path="/route_update/:id" element={<Route_Update/>}/>  

        <Route path="/location" element={<Location/>}/>
        <Route path="/location_add" element={<Location_Add/>}/> 
        <Route path="/location_update/:id" element={<Location_Update/>}/>  \

        <Route path="/flight" element={<Flight/>}/>
        <Route path="/flight_add" element={<Flight_Add/>}/> 
        <Route path="/flight_update/:id" element={<Flight_Update/>}/> 

        <Route path="/booking_list" element={<BookingList/>}/>
        <Route path="/booking_list_add" element={<BookingList_Add/>}/> 
        <Route path="/booking_list_update/:id" element={<BookingList_Update/>}/> 

        <Route path="/dashboard" element={<AdminPanel/>}/>

        <Route path="/user_list" element={<User/>}/>

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
