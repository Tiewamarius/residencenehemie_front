 import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import "../css/Restauration.css";

const SLIDES = [
    {
        image: "/img/Restauration/3.jpg",
        titleKey: "slides.table.title",
        textKey: "slides.table.text",
    },
    {
        image: "/img/Restauration/1.jpg",
        titleKey: "slides.anywhere.title",
        textKey: "slides.anywhere.text",
    },
    {
        image: "/img/Restauration/2.jpg",
        titleKey: "slides.flavors.title",
        textKey: "slides.flavors.text",
    },
];

const OFFERS = [
    {
        titleKey: "offers.breakfast.title",
        textKey: "offers.breakfast.text",
    },
    {
        titleKey: "offers.lunchDinner.title",
        textKey: "offers.lunchDinner.text",
    },
    {
        titleKey: "offers.roomService.title",
        textKey: "offers.roomService.text",
    },
];

const HOURS = [
    {
        labelKey: "hours.breakfast.label",
        time: "07h00 – 10h30",
    },
    {
        labelKey: "hours.lunch.label",
        time: "12h00 – 15h00",
    },
    {
        labelKey: "hours.dinner.label",
        time: "18h30 – 22h30",
    },
];

const AUTOPLAY_MS = 6000;

export default function Restauration() {
    const { t } = useTranslation();

    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);

    const goTo = useCallback((index) => {
        setCurrent((index + SLIDES.length) % SLIDES.length);
    }, []);

    const previousSlide = useCallback(() => {
        setCurrent((index) => (index - 1 + SLIDES.length) % SLIDES.length);
    }, []);

    const nextSlide = useCallback(() => {
        setCurrent((index) => (index + 1) % SLIDES.length);
    }, []);

    useEffect(() => {
        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (paused || reducedMotion) {
            return undefined;
        }

        const timer = window.setInterval(() => {
            setCurrent((index) => (index + 1) % SLIDES.length);
        }, AUTOPLAY_MS);

        return () => window.clearInterval(timer);
    }, [paused]);

    return (
        <main className="resto-page">
            {/* HERO SLIDER */}
            <section
                className="resto-hero"
                aria-roledescription="carousel"
                aria-label={t("restauration.hero.ariaLabel")}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                onFocus={() => setPaused(true)}
                onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                        setPaused(false);
                    }
                }}
            >
                {SLIDES.map((slide, index) => (
                    <div
                        key={slide.image}
                        className={`resto-slide ${
                            index === current ? "active" : ""
                        }`}
                        style={{
                            backgroundImage: `url("${slide.image}")`,
                        }}
                        aria-hidden={index !== current}
                    >
                        <div className="resto-slide-content">
                            <h1 className="resto-slide-title">
                                {t(`restauration.${slide.titleKey}`)}
                            </h1>

                            <p>
                                {t(`restauration.${slide.textKey}`)}
                            </p>
                        </div>
                    </div>
                ))}

                {/* Précédent */}
                <button
                    type="button"
                    className="resto-arrow prev"
                    aria-label={t("restauration.hero.previous")}
                    onClick={previousSlide}
                >
                    <FaChevronLeft aria-hidden="true" />
                </button>

                {/* Suivant */}
                <button
                    type="button"
                    className="resto-arrow next"
                    aria-label={t("restauration.hero.next")}
                    onClick={nextSlide}
                >
                    <FaChevronRight aria-hidden="true" />
                </button>

                {/* Indicateurs */}
                <div className="resto-dots">
                    {SLIDES.map((slide, index) => (
                        <button
                            key={`${slide.image}-dot`}
                            type="button"
                            className={index === current ? "active" : ""}
                            aria-label={t(
                                "restauration.hero.goToSlide",
                                { number: index + 1 }
                            )}
                            aria-current={index === current ? "true" : undefined}
                            onClick={() => goTo(index)}
                        />
                    ))}
                </div>
            </section>

           {/* INTRODUCTION + IMAGE */}
<section className="resto-section resto-intro-layout">
    {/* GAUCHE : TEXTE */}
    <div className="resto-intro-content">
        <h2>{t("restauration.intro.title")}</h2>

        <p>{t("restauration.intro.text")}</p>
    </div>
<div className="resto-intro-image">
    <img src="/img/Restauration/menu.jpeg" />
    {/* {restaurantImage && (
        <img src={restaurantImage} alt={t("restauration.intro.title")} />
    )} */}
</div>
</section>

            {/* HORAIRES ET CONTACT */}
            <section className="resto-section resto-hours">
                <div>
                    <h2>{t("restauration.hours.title")}</h2>

                    <dl>
                        {HOURS.map((hour) => (
                            <div
                                key={hour.labelKey}
                                className="resto-hours-row"
                            >
                                <dt>{t(`restauration.${hour.labelKey}`)}</dt>
                                <dd>{hour.time}</dd>
                            </div>
                        ))}
                    </dl>
                </div>

                {/* CTA */}
                <div className="resto-cta">
                    <h2>{t("restauration.cta.title")}</h2>
                    <p>{t("restauration.cta.text")}</p>

                    <div className="resto-cta-actions">
                        <a
                            href="https://wa.me/2250500326868"
                            className="resto-btn"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {t("restauration.cta.whatsapp")}
                        </a>

                        <Link
                            to="/reservation"
                            className="resto-btn outline"
                        >
                            {t("restauration.cta.reservation")}
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
} 