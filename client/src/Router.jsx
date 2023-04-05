import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './layouts/Navbar/Navbar'
import Themeprovider from './Themeprovider'
import CssBaseline from '@mui/material/CssBaseline'
import CustomContext from './context/CustomContext'
import Home from './pages/Home'
import Hostproperty from './pages/Hostproperty'
import Viewhosted from './pages/Viewhosted'
import Editproperty from './pages/Editproperty'
import HostDetailPage from './pages/HostDetailPage'
import MapPage from './pages/MapPage'
import PropertyDetail from './pages/PropertyDetail'


export default function Router() {
    return (
        <Themeprovider>
            <CssBaseline />
            <CustomContext>
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/hostDetail" element={<HostDetailPage />} />
                        <Route path="/hostproperty" element={<Hostproperty />} />
                        <Route path="/view-listed-property" element={<Viewhosted />} />
                        <Route path="/Edit-listed-property" element={<Editproperty />} />
                        <Route path="/Map" element={<MapPage />} />
                        <Route path='/propertyDetail' element={<PropertyDetail/>} />
                    </Routes>
                </BrowserRouter>
            </CustomContext>
        </Themeprovider>
    )
}


