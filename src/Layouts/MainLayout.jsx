import { Outlet } from "react-router-dom";

import Header from "../Components/Header";
import Footer from "../Components/Footer";
import MapSection from "../Components/MapSection";
import ChatWidget from "../Components/Chatwidget";

export default function MainLayout() {
    return (
        <div className="knsl-app">
            <Header />

            <main className="knsl-main">
                <Outlet />
            </main>

            <ChatWidget />

            <MapSection />
            <Footer />
        </div>
    );
} 