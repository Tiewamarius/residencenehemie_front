 import Hero from "../Components/Hero";
import Amenities from "../Components/Amenities";
import AboutResidence from "../Components/AboutResidence";
import AppartSection from "../Components/AppartSection";

export default function Home() {
    return (
        <>
            <Hero />

            <div id="content">
                <Amenities />
                <AboutResidence />
                <AppartSection />
            </div>
        </>
    );
} 