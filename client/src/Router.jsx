import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './layouts/Navbar/Navbar'
import Themeprovider from './Themeprovider'
import CssBaseline from '@mui/material/CssBaseline'
import CustomContext from './context/CustomContext'
import Loading from './pages/Loading'
import ErrorPage from './pages/ErrorPage'
import HostAuth from './pages/HostAuth'
import Chat from './pages/Chat'

const Hostproperty = lazy(() => import('./pages/Hostproperty'))
const Viewhosted = lazy(() => import('./pages/Viewhosted'))
const Editproperty = lazy(() => import('./pages/Editproperty'))
const HostDetailPage = lazy(() => import('./pages/HostDetailPage'))
const PropertyDetail = lazy(() => import('./pages/PropertyDetail'))
const CheckoutSuccess = lazy(() => import('./pages/CheckoutSuccess'))
const CancelCheckout = lazy(() => import('./pages/CancelCheckout'))
const ViewBooking = lazy(() => import('./pages/ViewBooking'))
const ViewReservation = lazy(() => import('./pages/ViewReservation'))
const SearchPage = lazy(() => import('./pages/SearchPage'))
const ProfilePage = lazy(() => import('./pages/ProfilePage'))
const UserAuth = lazy(() => import('./pages/UserAuth'))
import { ErrorBoundary } from 'react-error-boundary'
import ErrorHandler from './pages/Errorhandler'
import Wishlist from './layouts/Wishlist'
import HomePage from './pages/HomePage'

function Router() {
    return (
        <ErrorBoundary FallbackComponent={ErrorHandler}>
            <Themeprovider>
                <CssBaseline />
                <CustomContext>
                    <BrowserRouter>
                        <Navbar />
                        <Suspense fallback={<Loading />}>
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route
                                    path="/Search"
                                    element={<SearchPage />}
                                />
                                <Route
                                    path="/propertyDetail"
                                    element={<PropertyDetail />}
                                />
                                <Route element={<UserAuth />}>
                                    <Route
                                        path="/hostDetail"
                                        element={<HostDetailPage />}
                                    />
                                    <Route element={<HostAuth />}>
                                        <Route
                                            path="/hostproperty"
                                            element={<Hostproperty />}
                                        />
                                        <Route
                                            path="/view-listed-property"
                                            element={<Viewhosted />}
                                        />
                                        <Route
                                            path="/Edit-listed-property"
                                            element={<Editproperty />}
                                        />
                                        <Route
                                            path="/Reservation"
                                            element={<ViewReservation />}
                                        />
                                    </Route>
                                    <Route
                                        path="/success"
                                        element={<CheckoutSuccess />}
                                    />
                                    <Route
                                        path="/cancel"
                                        element={<CancelCheckout />}
                                    />
                                    <Route
                                        path="/Bookings"
                                        element={<ViewBooking />}
                                    />

                                    <Route
                                        path="/Profile"
                                        element={<ProfilePage />}
                                    />
                                    <Route
                                        path="/Wishlist"
                                        element={<Wishlist />}
                                    />
                                    <Route
                                        path="/ViewChat"
                                        element={<Chat />}
                                    />
                                </Route>
                                <Route path="*" element={<ErrorPage />} />
                            </Routes>
                        </Suspense>
                    </BrowserRouter>
                </CustomContext>
            </Themeprovider>
        </ErrorBoundary>
    )
}

export default Router
