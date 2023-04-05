import React from "react";
import Themeprovider from "./Themeprovider";
import Userpage from "./pages/Userpage";
import Externalcontext from "./context/Externalcontext";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import Sidebar from "./pages/Sidebar";
import Adminauth from "./pages/Adminauth";
import HostApproval from "./pages/HostApproval";
import Propertylist from "./pages/Propertylist";
import PropertyType from "./pages/PropertyType";
import PropertyAminities from "./pages/PropertyAminities";
function Router() {
  return (
    <Themeprovider>
      <Externalcontext>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Navigate to="/login" replace />}/>
            <Route path="/login" element={<Login />} />
          </Routes>
          <Sidebar>
            <Routes>
              <Route element={<Adminauth/>} >
                <Route path="/users" element={<Userpage />} />
                <Route path="/Hosting-Request" element={<HostApproval />} />
                <Route path="/Property-Management" element={<Propertylist />} />
                <Route path="/Property-Category" element={<PropertyType />} />
                <Route path="/Property-Facility" element={<PropertyAminities />} />
              </Route>
            </Routes>
          </Sidebar>
        </BrowserRouter>
      </Externalcontext>
    </Themeprovider>
  );
}


export default Router;
