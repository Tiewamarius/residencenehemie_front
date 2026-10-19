import { useEffect, useRef } from "react";
import {
    useSearchParams,
} from "react-router-dom";
import { useTranslation } from "react-i18next";

import "../css/BookingWidget.css";

const HOST =
    "https://book.securebookings.net";

const WIDGET_ID =
    "6dfc3965-177b-1790682794-4a54-8af1-a5a33a0aef28";

const CSS_ID =
    "rn-securebookings-css";

const WRAPPER_ID =
    "hbe-bws-wrapper";

const SEARCH_FILTER_ID =
    "searchFilter";

const WIDGET_SCRIPT =
    `${HOST}/js/v2/widget.all.js`;

const WIDGET_CUSTOMIZE_PREFIX =
    `${HOST}/widgetCustomize`;

const STICKY_TOP = 108;

export default function HotelLinkWidget() {

    const { t, i18n } =
        useTranslation();

    const [searchParams] =
        useSearchParams();

    /*
    |--------------------------------------------------------------------------
    | LANGUE
    |--------------------------------------------------------------------------
    */

    const lang =
        i18n.language?.startsWith("en")
            ? "en"
            : "fr";

    /*
    |--------------------------------------------------------------------------
    | PARAMÈTRES DE RÉSERVATION
    |--------------------------------------------------------------------------
    */

    const checkIn =
        searchParams.get("check_in") || "";

    const checkOut =
        searchParams.get("check_out") || "";

    const adults =
        searchParams.get("filter_adult") || "";

    const children =
        searchParams.get("filter_child") || "";

    const rooms =
        searchParams.get("filter_room") || "";

    /*
    |--------------------------------------------------------------------------
    | INSTANCE
    |--------------------------------------------------------------------------
    */

    const instanceRef =
        useRef(0);

    /*
    |--------------------------------------------------------------------------
    | SECUREBOOKINGS
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        const instanceId =
            ++instanceRef.current;

        let cancelled =
            false;

        let searchFilter =
            null;

        let stickyActivated =
            false;

        let searchFilterPageY =
            null;

        let originalWidth =
            null;

        let originalLeft =
            null;

        let originalHeight =
            null;

        let placeholder =
            null;

        let searchFilterObserver =
            null;

        let searchFilterTimer =
            null;

        let initTimer =
            null;

        let listenersInstalled =
            false;

        /*
        |--------------------------------------------------------------------------
        | INSTANCE ACTIVE
        |--------------------------------------------------------------------------
        */

        const isActive =
            () =>
                !cancelled &&
                instanceRef.current ===
                    instanceId;

        /*
        |--------------------------------------------------------------------------
        | WRAPPER
        |--------------------------------------------------------------------------
        */

        const wrapper =
            document.getElementById(
                WRAPPER_ID
            );

        if (!wrapper) {

            console.error(
                "[SecureBookings] Conteneur introuvable."
            );

            return undefined;
        }

        /*
        |--------------------------------------------------------------------------
        | CSS
        |--------------------------------------------------------------------------
        */

        const ensureStylesheet =
            () => {

                let stylesheet =
                    document.getElementById(
                        CSS_ID
                    );

                if (stylesheet) {
                    return;
                }

                stylesheet =
                    document.createElement(
                        "link"
                    );

                stylesheet.id =
                    CSS_ID;

                stylesheet.rel =
                    "stylesheet";

                stylesheet.type =
                    "text/css";

                stylesheet.href =
                    `${HOST}/css/app-v2.css`;

                document.head.appendChild(
                    stylesheet
                );
            };

        ensureStylesheet();

        /*
        |--------------------------------------------------------------------------
        | SUPPRESSION SCRIPTS
        |--------------------------------------------------------------------------
        */

        const removeWidgetScripts =
            () => {

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

                            const isMainScript =
                                src.startsWith(
                                    WIDGET_SCRIPT
                                );

                            const isCustomizeScript =
                                src.startsWith(
                                    WIDGET_CUSTOMIZE_PREFIX
                                );

                            if (
                                isMainScript ||
                                isCustomizeScript
                            ) {

                                script.remove();
                            }
                        }
                    );
            };

        /*
        |--------------------------------------------------------------------------
        | SUPPRESSION GLOBAL
        |--------------------------------------------------------------------------
        */

        const removeWidgetGlobal =
            () => {

                try {

                    delete window.hbeBws;

                } catch (error) {

                    try {

                        window.hbeBws =
                            undefined;

                    } catch (_) {
                        // Rien à faire.
                    }
                }
            };

        /*
        |--------------------------------------------------------------------------
        | NETTOYAGE WRAPPER
        |--------------------------------------------------------------------------
        */

        const cleanWrapper =
            () => {

                if (
                    wrapper
                ) {

                    wrapper.replaceChildren();
                }
            };

        /*
        |--------------------------------------------------------------------------
        | NETTOYAGE INITIAL
        |--------------------------------------------------------------------------
        */

        removeWidgetScripts();

        removeWidgetGlobal();

        cleanWrapper();

        /*
        |--------------------------------------------------------------------------
        | CHARGEMENT SCRIPT
        |--------------------------------------------------------------------------
        */

        const loadScript =
            (
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
                            !isActive()
                        ) {

                            reject(
                                new Error(
                                    "Instance SecureBookings annulée."
                                )
                            );

                            return;
                        }

                        let existing =
                            Array.from(
                                document.querySelectorAll(
                                    "script[src]"
                                )
                            ).find(
                                (script) => {

                                    const currentSrc =
                                        script.getAttribute(
                                            "src"
                                        ) || "";

                                    return (
                                        currentSrc ===
                                        src
                                    );
                                }
                            );

                        if (
                            existing &&
                            forceReload
                        ) {

                            existing.remove();

                            existing =
                                null;
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
                                            `Erreur de chargement : ${src}`
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
                                    isActive()
                                ) {

                                    resolve(
                                        script
                                    );

                                } else {

                                    reject(
                                        new Error(
                                            "Instance SecureBookings annulée."
                                        )
                                    );
                                }
                            };

                        script.onerror =
                            () => {

                                reject(
                                    new Error(
                                        `Erreur de chargement : ${src}`
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
        | ATTENDRE hbeBws
        |--------------------------------------------------------------------------
        */

        const waitForHbeBws =
            (
                timeout = 10000
            ) => {

                return new Promise(
                    (
                        resolve,
                        reject
                    ) => {

                        const startedAt =
                            Date.now();

                        const check =
                            () => {

                                if (
                                    !isActive()
                                ) {

                                    reject(
                                        new Error(
                                            "Initialisation annulée."
                                        )
                                    );

                                    return;
                                }

                                if (
                                    window.hbeBws &&
                                    typeof window
                                        .hbeBws
                                        .init ===
                                        "function"
                                ) {

                                    resolve(
                                        window.hbeBws
                                    );

                                    return;
                                }

                                if (
                                    Date.now() -
                                        startedAt >=
                                        timeout
                                ) {

                                    reject(
                                        new Error(
                                            "hbeBws.init() introuvable après 10 secondes."
                                        )
                                    );

                                    return;
                                }

                                initTimer =
                                    window.setTimeout(
                                        check,
                                        100
                                    );
                            };

                        check();
                    }
                );
            };

        /*
        |--------------------------------------------------------------------------
        | POSITION INITIALE
        |--------------------------------------------------------------------------
        */

        const calculatePosition =
            () => {

                if (
                    !isActive() ||
                    !searchFilter ||
                    stickyActivated
                ) {
                    return;
                }

                const rect =
                    searchFilter.getBoundingClientRect();

                searchFilterPageY =
                    rect.top +
                    window.scrollY;

                originalWidth =
                    rect.width;

                originalLeft =
                    rect.left;

                originalHeight =
                    rect.height;

                console.log(
                    "[Sticky] Position formulaire :",
                    searchFilterPageY
                );
            };

        /*
        |--------------------------------------------------------------------------
        | STICKY ON
        |--------------------------------------------------------------------------
        */

        const activateSticky =
            () => {

                if (
                    !isActive() ||
                    !searchFilter ||
                    stickyActivated
                ) {
                    return;
                }

                const rect =
                    searchFilter.getBoundingClientRect();

                originalWidth =
                    rect.width;

                originalLeft =
                    rect.left;

                originalHeight =
                    rect.height;

                placeholder =
                    document.createElement(
                        "div"
                    );

                placeholder.className =
                    "securebookings-sticky-placeholder";

                placeholder.style.width =
                    `${originalWidth}px`;

                placeholder.style.height =
                    `${originalHeight}px`;

                placeholder.style.display =
                    "block";

                if (
                    searchFilter.parentNode
                ) {

                    searchFilter.parentNode.insertBefore(
                        placeholder,
                        searchFilter
                    );
                }

                searchFilter.classList.add(
                    "securebookings-is-sticky"
                );

                searchFilter.style.setProperty(
                    "position",
                    "fixed",
                    "important"
                );

                searchFilter.style.setProperty(
                    "top",
                    `${STICKY_TOP}px`,
                    "important"
                );

                searchFilter.style.setProperty(
                    "left",
                    `${originalLeft}px`,
                    "important"
                );

                searchFilter.style.setProperty(
                    "width",
                    `${originalWidth}px`,
                    "important"
                );

                searchFilter.style.setProperty(
                    "z-index",
                    "99999",
                    "important"
                );

                stickyActivated =
                    true;

                console.log(
                    "[Sticky] ACTIVÉ"
                );
            };

        /*
        |--------------------------------------------------------------------------
        | STICKY OFF
        |--------------------------------------------------------------------------
        */

        const deactivateSticky =
            () => {

                if (
                    !searchFilter ||
                    !stickyActivated
                ) {
                    return;
                }

                searchFilter.classList.remove(
                    "securebookings-is-sticky"
                );

                searchFilter.style.removeProperty(
                    "position"
                );

                searchFilter.style.removeProperty(
                    "top"
                );

                searchFilter.style.removeProperty(
                    "left"
                );

                searchFilter.style.removeProperty(
                    "width"
                );

                searchFilter.style.removeProperty(
                    "z-index"
                );

                if (
                    placeholder
                ) {

                    placeholder.remove();

                    placeholder =
                        null;
                }

                stickyActivated =
                    false;

                requestAnimationFrame(
                    () => {

                        if (
                            isActive() &&
                            searchFilter
                        ) {

                            calculatePosition();
                        }
                    }
                );

                console.log(
                    "[Sticky] DÉSACTIVÉ"
                );
            };

        /*
        |--------------------------------------------------------------------------
        | SCROLL
        |--------------------------------------------------------------------------
        */

        const handleScroll =
            () => {

                if (
                    !isActive() ||
                    !searchFilter ||
                    searchFilterPageY ===
                        null
                ) {
                    return;
                }

                const currentScroll =
                    window.scrollY;

                const triggerPoint =
                    searchFilterPageY -
                    STICKY_TOP;

                if (
                    currentScroll >=
                        triggerPoint &&
                    !stickyActivated
                ) {

                    activateSticky();

                    return;
                }

                if (
                    currentScroll <
                        triggerPoint &&
                    stickyActivated
                ) {

                    deactivateSticky();
                }
            };

        /*
        |--------------------------------------------------------------------------
        | RESIZE
        |--------------------------------------------------------------------------
        */

        const handleResize =
            () => {

                if (
                    !isActive() ||
                    !searchFilter
                ) {
                    return;
                }

                if (
                    !stickyActivated
                ) {

                    calculatePosition();

                    return;
                }

                const wrapperRect =
                    wrapper.getBoundingClientRect();

                const width =
                    wrapperRect.width;

                const left =
                    wrapperRect.left;

                searchFilter.style.setProperty(
                    "width",
                    `${width}px`,
                    "important"
                );

                searchFilter.style.setProperty(
                    "left",
                    `${left}px`,
                    "important"
                );

                if (
                    placeholder
                ) {

                    placeholder.style.width =
                        `${width}px`;
                }
            };

        /*
        |--------------------------------------------------------------------------
        | LISTENERS
        |--------------------------------------------------------------------------
        */

        const installWindowListeners =
            () => {

                if (
                    listenersInstalled
                ) {
                    return;
                }

                window.addEventListener(
                    "scroll",
                    handleScroll,
                    {
                        passive: true,
                    }
                );

                window.addEventListener(
                    "resize",
                    handleResize
                );

                listenersInstalled =
                    true;
            };

        /*
        |--------------------------------------------------------------------------
        | SEARCH FILTER
        |--------------------------------------------------------------------------
        */

        const attachSearchFilter =
            (element) => {

                if (
                    !element ||
                    !isActive()
                ) {
                    return;
                }

                if (
                    searchFilter ===
                    element
                ) {

                    return;
                }

                if (
                    searchFilter &&
                    searchFilter !==
                        element
                ) {

                    try {

                        searchFilter.classList.remove(
                            "securebookings-is-sticky"
                        );

                        searchFilter.style.removeProperty(
                            "position"
                        );

                        searchFilter.style.removeProperty(
                            "top"
                        );

                        searchFilter.style.removeProperty(
                            "left"
                        );

                        searchFilter.style.removeProperty(
                            "width"
                        );

                        searchFilter.style.removeProperty(
                            "z-index"
                        );

                    } catch (_) {
                        // Élément supprimé.
                    }
                }

                if (
                    placeholder
                ) {

                    placeholder.remove();

                    placeholder =
                        null;
                }

                searchFilter =
                    element;

                stickyActivated =
                    false;

                searchFilterPageY =
                    null;

                console.log(
                    "[SecureBookings] #searchFilter trouvé."
                );

                installWindowListeners();

                requestAnimationFrame(
                    () => {

                        requestAnimationFrame(
                            () => {

                                if (
                                    isActive() &&
                                    searchFilter
                                ) {

                                    calculatePosition();

                                    handleScroll();
                                }
                            }
                        );
                    }
                );
            };

        /*
        |--------------------------------------------------------------------------
        | RECHERCHE FORMULAIRE
        |--------------------------------------------------------------------------
        */

        const findSearchFilter =
            () => {

                if (
                    !isActive()
                ) {
                    return;
                }

                const element =
                    document.getElementById(
                        SEARCH_FILTER_ID
                    );

                if (
                    element
                ) {

                    attachSearchFilter(
                        element
                    );

                    return;
                }

                searchFilterTimer =
                    window.setTimeout(
                        findSearchFilter,
                        200
                    );
            };

        /*
        |--------------------------------------------------------------------------
        | MUTATION OBSERVER
        |--------------------------------------------------------------------------
        */

        searchFilterObserver =
            new MutationObserver(
                () => {

                    if (
                        !isActive()
                    ) {
                        return;
                    }

                    const element =
                        document.getElementById(
                            SEARCH_FILTER_ID
                        );

                    if (
                        element
                    ) {

                        attachSearchFilter(
                            element
                        );
                    }
                }
            );

        searchFilterObserver.observe(
            wrapper,
            {
                childList: true,
                subtree: true,
            }
        );

        /*
        |--------------------------------------------------------------------------
        | CUSTOMIZE URL
        |--------------------------------------------------------------------------
        */

        const customizeUrl =
            `${WIDGET_CUSTOMIZE_PREFIX}` +
            `?lang=${encodeURIComponent(lang)}` +
            `&widgetType=Widget` +
            `&id=${encodeURIComponent(WIDGET_ID)}` +
            `&ajax=true` +
            `&_t=${Date.now()}`;

        console.log(
            "[SecureBookings] Langue widget :",
            lang
        );

        console.log(
            "[SecureBookings] Customize URL :",
            customizeUrl
        );

        /*
        |--------------------------------------------------------------------------
        | INITIALISATION
        |--------------------------------------------------------------------------
        */

        const initializeWidget =
            async () => {

                try {

                    /*
                    |--------------------------------------------------------------------------
                    | SCRIPT PRINCIPAL AVEC CACHE BUSTING
                    |--------------------------------------------------------------------------
                    */

                    const widgetScriptUrl =
                        `${WIDGET_SCRIPT}?_rn=${Date.now()}`;

                    console.log(
                        "[SecureBookings] Script principal :",
                        widgetScriptUrl
                    );

                    await loadScript(
                        widgetScriptUrl,
                        {
                            forceReload: true,
                        }
                    );

                    if (
                        !isActive()
                    ) {
                        return;
                    }

                    /*
                    |--------------------------------------------------------------------------
                    | SCRIPT DE LANGUE
                    |--------------------------------------------------------------------------
                    */

                    console.log(
                        "[SecureBookings] Chargement langue :",
                        lang
                    );

                    await loadScript(
                        customizeUrl,
                        {
                            forceReload: true,
                        }
                    );

                    if (
                        !isActive()
                    ) {
                        return;
                    }

                    /*
                    |--------------------------------------------------------------------------
                    | hbeBws
                    |--------------------------------------------------------------------------
                    */

                    console.log(
                        "[SecureBookings] Recherche de hbeBws..."
                    );

                    const hbeBws =
                        await waitForHbeBws();

                    if (
                        !isActive()
                    ) {
                        return;
                    }

                    /*
                    |--------------------------------------------------------------------------
                    | INIT
                    |--------------------------------------------------------------------------
                    */

                    console.log(
                        `[SecureBookings] Initialisation ${lang.toUpperCase()}...`
                    );

                    hbeBws.init();

                    console.log(
                        `[SecureBookings] init() ${lang.toUpperCase()} terminé.`
                    );

                    /*
                    |--------------------------------------------------------------------------
                    | FORMULAIRE
                    |--------------------------------------------------------------------------
                    */

                    findSearchFilter();

                } catch (error) {

                    if (
                        isActive()
                    ) {

                        console.error(
                            "[SecureBookings] Erreur d'initialisation :",
                            error
                        );
                    }
                }
            };

        /*
        |--------------------------------------------------------------------------
        | DEBUG
        |--------------------------------------------------------------------------
        */

        console.log(
            "[Reservation] Paramètres reçus :",
            {
                checkIn,
                checkOut,
                adults,
                children,
                rooms,
                lang,
            }
        );

        /*
        |--------------------------------------------------------------------------
        | START
        |--------------------------------------------------------------------------
        */

        initializeWidget();

        /*
        |--------------------------------------------------------------------------
        | CLEANUP
        |--------------------------------------------------------------------------
        */

        return () => {

            cancelled =
                true;

            if (
                searchFilterTimer
            ) {

                window.clearTimeout(
                    searchFilterTimer
                );

                searchFilterTimer =
                    null;
            }

            if (
                initTimer
            ) {

                window.clearTimeout(
                    initTimer
                );

                initTimer =
                    null;
            }

            window.removeEventListener(
                "scroll",
                handleScroll
            );

            window.removeEventListener(
                "resize",
                handleResize
            );

            listenersInstalled =
                false;

            if (
                searchFilterObserver
            ) {

                searchFilterObserver.disconnect();

                searchFilterObserver =
                    null;
            }

            if (
                searchFilter
            ) {

                try {

                    searchFilter.classList.remove(
                        "securebookings-is-sticky"
                    );

                    searchFilter.style.removeProperty(
                        "position"
                    );

                    searchFilter.style.removeProperty(
                        "top"
                    );

                    searchFilter.style.removeProperty(
                        "left"
                    );

                    searchFilter.style.removeProperty(
                        "width"
                    );

                    searchFilter.style.removeProperty(
                        "z-index"
                    );

                } catch (_) {
                    // Élément supprimé.
                }
            }

            if (
                placeholder
            ) {

                placeholder.remove();

                placeholder =
                    null;
            }

            cleanWrapper();

            removeWidgetScripts();

            removeWidgetGlobal();

            searchFilter =
                null;

            searchFilterPageY =
                null;

            originalWidth =
                null;

            originalLeft =
                null;

            originalHeight =
                null;

            stickyActivated =
                false;
        };

    }, [
        lang,
        checkIn,
        checkOut,
        adults,
        children,
        rooms,
    ]);

    /*
    |--------------------------------------------------------------------------
    | JSX
    |--------------------------------------------------------------------------
    */

    return (
        <div
            className="booking-widget"
            aria-label={t(
                "hero.bookingLabel",
                {
                    defaultValue:
                        "Réservation",
                }
            )}
        >

            <div className="hbe-bws">

                <section id="hbe-bws-page">

                    <div
                        id={WRAPPER_ID}
                    />

                </section>

            </div>

        </div>
    );
}