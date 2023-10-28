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

import Delay from "./pages/Admin/Delay/Delay";
import Delay_Arrival from "./pages/Admin/Delay/DelayArrival";
import Delay_Depature from "./pages/Admin/Delay/DelayDepature";


import BookingList from "./pages/Admin/BookingList/BookingList";
import BookingList_Add from "./pages/Admin/BookingList/BookingListAdd";
import BookingList_Update from "./pages/Admin/BookingList/BookingListUpdate";

import User from "./pages/Admin/User/User";
import AdminPanel from "./pages/Admin/AdminPanel";

import Report from "./pages/Admin/Reports/Report";
import Report_1 from "./pages/Admin/Reports/Report_1";
import Report_1_Results from "./pages/Admin/Reports/Report_1_Results";
import Report_2 from "./pages/Admin/Reports/Report_2";
import Report_2_Results from "./pages/Admin/Reports/Report_2_Results";
import Report_3 from "./pages/Admin/Reports/Report_3";
import Report_3_Results from "./pages/Admin/Reports/Report_3_Results";
import Report_4 from "./pages/Admin/Reports/Report_4";
import Report_4_Results from "./pages/Admin/Reports/Report_4_Results";
import Report_5_Results from "./pages/Admin/Reports/Report_5_Results";


import SeatSelect from "./pages/SeatSelect"; 
import Ticket from "./pages/Ticket";

import Shedule from "./pages/Shedule";
import "./style.css";
import Booking from "./pages/Booking";
import FlightResults from "./pages/FlightResults";
import FAQ from "./pages/Help";
import FlightResultsTable from "./pages/FlightResults";
import NoFlightsAvailablePage from "./pages/NoAvailableFlights";



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

        <Route path="/delay" element={<Delay/>}/>
        <Route path="/delay_departure/:id" element={<Delay_Depature/>}/> 
        <Route path="/delay_arrival/:id" element={<Delay_Arrival/>}/>

        <Route path="/booking_list" element={<BookingList/>}/>
        <Route path="/booking_list_add" element={<BookingList_Add/>}/> 
        <Route path="/booking_list_update/:id" element={<BookingList_Update/>}/>

        <Route path="/route/available_flights/:originAirport/:targetAirport/:depature_time/:arrival_time" element={<FlightResultsTable/>} />
        <Route path="/route/noflightsavailablepage" element={<NoFlightsAvailablePage/>}/>

        <Route path="/dashboard" element={<AdminPanel/>}/>


        <Route path="/reports" element={<Report/>}/>
        <Route path="/report_1/" element={<Report_1/>}/>
        <Route path="/reports_1_results/:id" element={<Report_1_Results/>}/>
        <Route path="/report_2/" element={<Report_2/>}/>
        <Route path="/reports_2_results/:id/:id/:id" element={<Report_2_Results/>}/>
        <Route path="/report_3/" element={<Report_3/>}/>
        <Route path="/reports_3_results/:id/:id" element={<Report_3_Results/>}/>
        <Route path="/report_4/" element={<Report_4/>}/>
        <Route path="/reports_4_results/:id/:id" element={<Report_4_Results/>}/>
        <Route path="/report_5" element={<Report_5_Results/>}/>

        

        

        <Route path="/user_list" element={<User/>}/>
      
        <Route path="/flight-results" element={<FlightResults/>} />
        <Route path="/help" element={<FAQ />} />

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
