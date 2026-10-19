import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./i18n";
import ScrollToTop from './Components/ScrollToTop';
import MainLayout from "./Layouts/MainLayout";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import RestaurationPage from "./pages/RestaurationPage";
import Reservation from "./pages/Reservation";
import NotFound from './pages/NotFound';

export default function App() {
    return (
        <BrowserRouter>
        <ScrollToTop />
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/rooms" element={<Rooms />} />
                    <Route path="/restauration" element={<RestaurationPage />} />
                    <Route path="/reservation" element={<Reservation />} />
                    {/* <Route path="*" element={<NotFound />} /> */}
                </Route>
            </Routes>
        </BrowserRouter>
    );
} 