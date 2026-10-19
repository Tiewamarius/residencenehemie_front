import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const HOST = "https://book.securebookings.net";

const WIDGET_ID =
    "6dfc3965-177b-1790682794-4a54-8af1-a5a33a0aef28";

const CSS_ID = "hbe-search-wdg-css";

const SECTION_ID =
    "hbe-bws-wrapper-widget-code";

const PROMO_INPUT_ID =
    "hbe_promo_code";

const SCRIPT_SEARCH_URL =
    `${HOST}/js/widget.search.js`;

const CUSTOMIZE_SCRIPT_PREFIX =
    `${HOST}/searchWidgetCustomize`;

const RESERVATION_PATH =
    "/reservation";

export default function BookingWidget() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const lang =
        i18n.language?.startsWith("en")
            ? "en"
            : "fr";

    const promoPlaceholder =
        useRef("");

    /*
    |--------------------------------------------------------------------------
    | PLACEHOLDER
    |--------------------------------------------------------------------------
    */

    promoPlaceholder.current =
        t(
            "hero.promoCode",
            {
                defaultValue:
                    lang === "en"
                        ? "Promo code"
                        : "Code promo",
            }
        );

    /*
    |--------------------------------------------------------------------------
    | CSS SECUREBOOKINGS
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        let link =
            document.getElementById(
                CSS_ID
            );

        if (link) {
            return;
        }

        link =
            document.createElement(
                "link"
            );

        link.id =
            CSS_ID;

        link.rel =
            "stylesheet";

        link.type =
            "text/css";

        link.href =
            `${HOST}/css/search-wdg.css`;

        document.head.appendChild(
            link
        );
    }, []);

    /*
    |--------------------------------------------------------------------------
    | WIDGET
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        let cancelled = false;
        let observer = null;

        const timeoutIds = [];

        /*
        |--------------------------------------------------------------------------
        | SECTION
        |--------------------------------------------------------------------------
        */

        const getSection = () => {
            return document.getElementById(
                SECTION_ID
            );
        };

        /*
        |--------------------------------------------------------------------------
        | SUPPRESSION DES SCRIPTS
        |--------------------------------------------------------------------------
        */

        const removeSearchScripts = () => {
            document
                .querySelectorAll(
                    "script[src]"
                )
                .forEach(
                    (script) => {
                        const src =
                            script.getAttribute(
                                "src"
                            ) || "";

                        if (
                            src.includes(
                                "/js/widget.search.js"
                            ) ||
                            src.includes(
                                "/searchWidgetCustomize"
                            )
                        ) {
                            script.remove();
                        }
                    }
                );
        };

        /*
        |--------------------------------------------------------------------------
        | PLACEHOLDER
        |--------------------------------------------------------------------------
        */

        const applyPromoField = () => {
            if (cancelled) {
                return;
            }

            const input =
                document.getElementById(
                    PROMO_INPUT_ID
                );

            if (!input) {
                return;
            }

            const placeholder =
                promoPlaceholder.current;

            input.placeholder =
                placeholder;

            input.setAttribute(
                "aria-label",
                placeholder
            );

            input.setAttribute(
                "autocomplete",
                "off"
            );

            input.classList.add(
                "rn-promo-input"
            );
        };

        /*
        |--------------------------------------------------------------------------
        | NETTOYAGE CONTAINER
        |--------------------------------------------------------------------------
        */

        const cleanWidgetContainer = () => {
            const section =
                getSection();

            if (!section) {
                return;
            }

            section.replaceChildren();
        };

        /*
        |--------------------------------------------------------------------------
        | CHARGEMENT SCRIPT
        |--------------------------------------------------------------------------
        */

        const loadScript = (
            src,
            {
                forceReload = false,
            } = {}
        ) => {
            return new Promise(
                (
                    resolve,
                    reject
                ) => {
                    if (
                        cancelled
                    ) {
                        resolve();
                        return;
                    }

                    let existing =
                        Array.from(
                            document.querySelectorAll(
                                "script[src]"
                            )
                        ).find(
                            (script) =>
                                script.src ===
                                src
                        );

                    if (
                        forceReload &&
                        existing
                    ) {
                        existing.remove();
                        existing = null;
                    }

                    if (
                        existing &&
                        !forceReload
                    ) {
                        if (
                            existing.dataset.loaded ===
                            "true"
                        ) {
                            resolve(
                                existing
                            );

                            return;
                        }

                        existing.addEventListener(
                            "load",
                            () =>
                                resolve(
                                    existing
                                ),
                            {
                                once: true,
                            }
                        );

                        existing.addEventListener(
                            "error",
                            () =>
                                reject(
                                    new Error(
                                        `Échec du chargement : ${src}`
                                    )
                                ),
                            {
                                once: true,
                            }
                        );

                        return;
                    }

                    const script =
                        document.createElement(
                            "script"
                        );

                    script.type =
                        "text/javascript";

                    script.src =
                        src;

                    script.async =
                        false;

                    script.onload =
                        () => {
                            script.dataset.loaded =
                                "true";

                            if (
                                !cancelled
                            ) {
                                resolve(
                                    script
                                );
                            }
                        };

                    script.onerror =
                        () => {
                            reject(
                                new Error(
                                    `Échec du chargement : ${src}`
                                )
                            );
                        };

                    document.body.appendChild(
                        script
                    );
                }
            );
        };

        /*
        |--------------------------------------------------------------------------
        | VALEUR CHAMP
        |--------------------------------------------------------------------------
        */

        const getFieldValue = (
            form,
            names
        ) => {
            for (
                const name of names
            ) {
                const field =
                    form.querySelector(
                        `[name="${name}"]`
                    );

                if (
                    field &&
                    field.value !==
                        undefined &&
                    field.value !==
                        null &&
                    String(
                        field.value
                    ).trim() !== ""
                ) {
                    return String(
                        field.value
                    ).trim();
                }
            }

            return "";
        };

        /*
        |--------------------------------------------------------------------------
        | VALEURS RECHERCHE
        |--------------------------------------------------------------------------
        */

        const getSearchValues = (
            form
        ) => {
            const checkIn =
                getFieldValue(
                    form,
                    [
                        "check_in",
                        "checkin",
                        "checkIn",
                        "arrival",
                        "arrival_date",
                        "arrivalDate",
                    ]
                );

            const checkOut =
                getFieldValue(
                    form,
                    [
                        "check_out",
                        "checkout",
                        "checkOut",
                        "departure",
                        "departure_date",
                        "departureDate",
                    ]
                );

            const adults =
                getFieldValue(
                    form,
                    [
                        "filter_adult",
                        "adults",
                        "adult",
                        "adult_count",
                        "filterAdult",
                    ]
                ) || "2";

            const children =
                getFieldValue(
                    form,
                    [
                        "filter_child",
                        "children",
                        "child",
                        "child_count",
                        "filterChild",
                    ]
                ) || "0";

            const rooms =
                getFieldValue(
                    form,
                    [
                        "filter_room",
                        "rooms",
                        "room",
                        "room_count",
                        "filterRoom",
                    ]
                ) || "1";

            return {
                checkIn,
                checkOut,
                adults,
                children,
                rooms,
            };
        };

        /*
        |--------------------------------------------------------------------------
        | NAVIGATION
        |--------------------------------------------------------------------------
        */

        const goToReservation = (
            form,
            event
        ) => {
            if (!form) {
                return false;
            }

            if (
                !form.closest(
                    `#${SECTION_ID}`
                )
            ) {
                return false;
            }

            const {
                checkIn,
                checkOut,
                adults,
                children,
                rooms,
            } =
                getSearchValues(form);

            console.log(
                "[SecureBookings] Recherche :",
                {
                    checkIn,
                    checkOut,
                    adults,
                    children,
                    rooms,
                }
            );

            if (
                !checkIn ||
                !checkOut
            ) {
                console.warn(
                    "[SecureBookings] Dates manquantes."
                );

                return false;
            }

            if (event) {
                event.preventDefault();
                event.stopPropagation();

                if (
                    typeof event.stopImmediatePropagation ===
                    "function"
                ) {
                    event.stopImmediatePropagation();
                }
            }

            const params =
                new URLSearchParams();

            params.set(
                "check_in",
                checkIn
            );

            params.set(
                "check_out",
                checkOut
            );

            params.set(
                "filter_adult",
                adults
            );

            params.set(
                "filter_child",
                children
            );

            params.set(
                "filter_room",
                rooms
            );

            const url =
                `${RESERVATION_PATH}?${params.toString()}`;

            console.log(
                "[SecureBookings] Navigation React :",
                url
            );

            navigate(url);

            return true;
        };

        /*
        |--------------------------------------------------------------------------
        | CLICK
        |--------------------------------------------------------------------------
        */

        const handleDocumentClick =
            (event) => {
                if (
                    cancelled
                ) {
                    return;
                }

                const target =
                    event.target;

                if (
                    !(target instanceof Element)
                ) {
                    return;
                }

                const button =
                    target.closest(
                        `
                        button,
                        input[type="submit"],
                        input[type="button"],
                        a
                        `
                    );

                if (!button) {
                    return;
                }

                const section =
                    button.closest(
                        `#${SECTION_ID}`
                    );

                if (!section) {
                    return;
                }

                const form =
                    button.closest(
                        "form"
                    );

                if (!form) {
                    return;
                }

                const {
                    checkIn,
                    checkOut,
                } =
                    getSearchValues(
                        form
                    );

                if (
                    !checkIn ||
                    !checkOut
                ) {
                    return;
                }

                console.log(
                    "[SecureBookings] Clic Recherche intercepté"
                );

                goToReservation(
                    form,
                    event
                );
            };

        /*
        |--------------------------------------------------------------------------
        | SUBMIT
        |--------------------------------------------------------------------------
        */

        const handleSearchSubmit =
            (event) => {
                if (
                    cancelled
                ) {
                    return;
                }

                const form =
                    event.target;

                if (
                    !(form instanceof HTMLFormElement)
                ) {
                    return;
                }

                if (
                    !form.closest(
                        `#${SECTION_ID}`
                    )
                ) {
                    return;
                }

                goToReservation(
                    form,
                    event
                );
            };

        document.addEventListener(
            "click",
            handleDocumentClick,
            true
        );

        document.addEventListener(
            "submit",
            handleSearchSubmit,
            true
        );

        /*
        |--------------------------------------------------------------------------
        | INITIALISATION
        |--------------------------------------------------------------------------
        */

        const initializeWidget =
            async () => {
                try {
                    if (
                        cancelled
                    ) {
                        return;
                    }

                    console.log(
                        `[SecureBookings] Préparation widget accueil : ${lang}`
                    );

                    /*
                    |--------------------------------------------------------------------------
                    | 1. NETTOYAGE
                    |--------------------------------------------------------------------------
                    */

                    removeSearchScripts();

                    cleanWidgetContainer();

                    /*
                    |--------------------------------------------------------------------------
                    | 2. CACHE BUSTING DU SCRIPT PRINCIPAL
                    |--------------------------------------------------------------------------
                    */

                    const searchScriptUrl =
                        `${SCRIPT_SEARCH_URL}?_rn=${Date.now()}`;

                    console.log(
                        "[SecureBookings] Script principal :",
                        searchScriptUrl
                    );

                    await loadScript(
                        searchScriptUrl,
                        {
                            forceReload: true,
                        }
                    );

                    if (
                        cancelled
                    ) {
                        return;
                    }

                    /*
                    |--------------------------------------------------------------------------
                    | 3. SECTION
                    |--------------------------------------------------------------------------
                    */

                    const section =
                        getSection();

                    if (!section) {
                        console.error(
                            "[SecureBookings] Section introuvable."
                        );

                        return;
                    }

                    /*
                    |--------------------------------------------------------------------------
                    | 4. OBSERVER
                    |--------------------------------------------------------------------------
                    */

                    observer =
                        new MutationObserver(
                            () => {
                                if (
                                    !cancelled
                                ) {
                                    applyPromoField();
                                }
                            }
                        );

                    observer.observe(
                        section,
                        {
                            childList: true,
                            subtree: true,
                        }
                    );

                    /*
                    |--------------------------------------------------------------------------
                    | 5. SCRIPT DE PERSONNALISATION
                    |--------------------------------------------------------------------------
                    */

                    const customizeUrl =
                        `${CUSTOMIZE_SCRIPT_PREFIX}` +
                        `?lang=${encodeURIComponent(lang)}` +
                        `&id=${encodeURIComponent(WIDGET_ID)}` +
                        `&ajax=true` +
                        `&_t=${Date.now()}`;

                    console.log(
                        "[SecureBookings] Customize :",
                        customizeUrl
                    );

                    await loadScript(
                        customizeUrl,
                        {
                            forceReload: true,
                        }
                    );

                    if (
                        cancelled
                    ) {
                        return;
                    }

                    /*
                    |--------------------------------------------------------------------------
                    | 6. PLACEHOLDER
                    |--------------------------------------------------------------------------
                    */

                    applyPromoField();

                    /*
                    |--------------------------------------------------------------------------
                    | 7. FALLBACKS
                    |--------------------------------------------------------------------------
                    */

                    [
                        100,
                        300,
                        700,
                        1200,
                        2000,
                        3000,
                    ].forEach(
                        (delay) => {
                            const id =
                                window.setTimeout(
                                    () => {
                                        if (
                                            !cancelled
                                        ) {
                                            applyPromoField();
                                        }
                                    },
                                    delay
                                );

                            timeoutIds.push(
                                id
                            );
                        }
                    );

                    console.log(
                        `[SecureBookings] Widget accueil ${lang.toUpperCase()} chargé.`
                    );
                } catch (error) {
                    if (
                        !cancelled
                    ) {
                        console.error(
                            "[SecureBookings] Erreur initialisation :",
                            error
                        );
                    }
                }
            };

        initializeWidget();

        /*
        |--------------------------------------------------------------------------
        | CLEANUP
        |--------------------------------------------------------------------------
        */

        return () => {
            cancelled = true;

            timeoutIds.forEach(
                (id) => {
                    window.clearTimeout(
                        id
                    );
                }
            );

            observer?.disconnect();

            document.removeEventListener(
                "click",
                handleDocumentClick,
                true
            );

            document.removeEventListener(
                "submit",
                handleSearchSubmit,
                true
            );

            removeSearchScripts();

            cleanWidgetContainer();

            console.log(
                `[SecureBookings] Widget accueil ${lang.toUpperCase()} nettoyé.`
            );
        };
    }, [lang, navigate]);

    /*
    |--------------------------------------------------------------------------
    | JSX
    |--------------------------------------------------------------------------
    */

    return (
        <div className="booking-widget">
            <section
                id={SECTION_ID}
                aria-label={t(
                    "hero.bookingLabel",
                    {
                        defaultValue:
                            "Recherche de réservation",
                    }
                )}
            />
        </div>
    );
}