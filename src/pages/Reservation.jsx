import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import HotelLinkWidget from "../Components/HotelLinkWidget";
import "../css/Reservation.css";

export default function Reservation() {
    const { t } = useTranslation();

    return (
        <main className="reservation-page">

            <Helmet>
                <title>
                    {t(
                        "booking.pageTitle",
                        {
                            defaultValue:
                                "Réservation - Résidence Néhémie",
                        }
                    )}
                </title>
            </Helmet>

            {/* =================================================
                HERO
            ================================================= */}

            <section className="reservation-hero">

                <div className="reservation-hero-overlay" />

                <div className="reservation-hero-content">

                    <span className="reservation-eyebrow">
                        {t('booking.eyebrow')}
                    </span>

                    <h1>
                        {t('booking.title' )}
                    </h1>

                    <p>
                        {t('booking.subtitle')}
                    </p>

                </div>
                

            </section>


            {/* =================================================
                WIDGET DE RÉSERVATION
            ================================================= */}

            <div className="reservation-widget-container">

                <HotelLinkWidget />

            </div>

        </main>
    );
}