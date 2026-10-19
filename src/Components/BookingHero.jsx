import { useTranslation } from "react-i18next";

const TRUST = [
    {
        key: "booking.trust.secure",
        icon: "M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5z",
    },
    {
        key: "booking.trust.rate",
        icon: "M3 12 12 3h9v9l-9 9z",
    },
    {
        key: "booking.trust.cancel",
        icon: "M6 10V8a6 6 0 1 1 12 0v2h2v12H4V10z",
    },
];

function Icon({ d }) {
    return (
        <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            aria-hidden="true"
        >
            <path d={d} fill="currentColor" />
        </svg>
    );
}

export default function BookingHero() {
    const { t } = useTranslation();

    return (
        <section className="booking-hero">
            <div className="booking-hero__content">
                <p className="booking-hero__eyebrow">
                    {t("booking.eyebrow")}
                    
                </p>

                <h1>{t("booking.title")}</h1>

                <p className="booking-hero__sub">
                    {t("booking.subtitle")}
                </p>

                <ul className="booking-trust">
                    {TRUST.map((item) => (
                        <li key={item.key}>
                            <Icon d={item.icon} />

                            <span>
                                {t(item.key)}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}