import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import { useTranslation } from "react-i18next";

import "../css/Gallery.css";

/* =========================================================
   BANDEAU PRINCIPAL
========================================================= */

const heroMedia = [
    {
        type: "image",
        src: "/img/Deux_Chambre_Salon/Espace_commun/5.jpg",
        alt: "Résidence Néhémie",
    },
];

/* =========================================================
   DONNÉES DES APPARTEMENTS
========================================================= */

const apartments = [
    {
        id: 1,
        key: "signature",
        locationKey: "bingerville",

        images: [
            {
                src: "/img/ChambreDeluxe/5.jpg",
                categoryKey: "chambre",
                caption: "Lit confortable",
            },
            {
                src: "/img/ChambreDeluxe/8.jpg",
                categoryKey: "chambre",
                caption: "Lit double",
            },
            {
                src: "/img/ChambreDeluxe/1.jpg",
                categoryKey: "chambre",
                caption: "Veilleuse de chevet",
            },
            {
                src: "/img/ChambreDeluxe/4.jpg",
                categoryKey: "chambre",
                caption: "Vue d'ensemble de la chambre",
            },
            {
                src: "/img/ChambreDeluxe/12.jpg",
                categoryKey: "chambre",
                caption: "Coin lecture",
            },
            {
                src: "/img/ChambreDeluxe/13.jpg",
                categoryKey: "chambre",
                caption: "Espace de lecture",
            },
            {
                src: "/img/Appart8/Chambre_un/1.jpg",
                categoryKey: "chambre",
                caption: "Chambre spacieuse",
            },
            {
                src: "/img/Appart8/Chambre_un/3.jpg",
                categoryKey: "chambre",
                caption: "Lit double confortable",
            },
            {
                src: "/img/Appart8/Chambre_deux/1.jpg",
                categoryKey: "chambre",
                caption: "Deuxième chambre",
            },
            {
                src: "/img/ChambreDeluxe/16.jpg",
                categoryKey: "douche-interieure",
                caption: "Espace douche",
            },
            {
                src: "/img/ChambreDeluxe/17.jpg",
                categoryKey: "douche-interieure",
                caption: "Équipements de la douche",
            },
            {
                src: "/img/ChambreDeluxe/18.jpg",
                categoryKey: "douche-interieure",
                caption: "Salle d'eau",
            },
        ],
    },

    {
        id: 2,
        key: "elegance",
        locationKey: "bingerville",

        images: [
            {
                src: "/img/Appart8/Chambre_un/1.jpg",
                categoryKey: "chambre",
                caption: "Chambre spacieuse",
            },
            {
                src: "/img/Appart8/Chambre_un/3.jpg",
                categoryKey: "chambre",
                caption: "Lit double confortable",
            },
            {
                src: "/img/Appart8/Chambre_deux/1.jpg",
                categoryKey: "chambre",
                caption: "Deuxième chambre",
            },

            {
                src: "/img/Appart4/Salon/6.png",
                categoryKey: "salon",
                caption: "Vue du salon",
            },
            {
                src: "/img/Appart4/Salon/7.jpg",
                categoryKey: "salon",
                caption: "Espace salon",
            },
            {
                src: "/img/Appart4/Salon/8.jpg",
                categoryKey: "salon",
                caption: "Aménagement du salon",
            },
            {
                src: "/img/Appart4/Salon/10.jpg",
                categoryKey: "salon",
                caption: "Décoration du salon",
            },
            {
                src: "/img/Appart4/Salon/9.jpg",
                categoryKey: "salon",
                caption: "Espace détente",
            },
            {
                src: "/img/Appart4/Salon/5.jpg",
                categoryKey: "salon",
                caption: "Vue complémentaire du salon",
            },
            {
                src: "/img/Appart4/Salon/4.jpg",
                categoryKey: "salon",
                caption: "Mobilier du salon",
            },

            {
                src: "/img/Appart4/Cuisine/Cuisine.jpg",
                categoryKey: "cuisine",
                caption: "Cuisine équipée",
            },
            {
                src: "/img/Appart4/Cuisine/Cuisine 02.jpg",
                categoryKey: "cuisine",
                caption: "Espace cuisine",
            },
            {
                src: "/img/Appart4/Cuisine/Cuisine 03.jpg",
                categoryKey: "cuisine",
                caption: "Aménagement de la cuisine",
            },
            {
                src: "/img/Appart4/Cuisine/Placard 1.jpg",
                categoryKey: "cuisine",
                caption: "Placards de rangement",
            },
            {
                src: "/img/Appart4/Cuisine/Mixeurs.jpg",
                categoryKey: "cuisine",
                caption: "Équipements de cuisine",
            },

            {
                src: "/img/ChambreDeluxe/16.jpg",
                categoryKey: "douche-interieure",
                caption: "Espace douche",
            },
            {
                src: "/img/ChambreDeluxe/17.jpg",
                categoryKey: "douche-interieure",
                caption: "Équipements de la douche",
            },
            {
                src: "/img/ChambreDeluxe/18.jpg",
                categoryKey: "douche-interieure",
                caption: "Salle d'eau",
            },

            {
                src: "/img/Appart4/Toilettevisiteur/1.jpg",
                categoryKey: "douche-visiteur",
                caption: "Douche visiteurs",
            },
            {
                src: "/img/Appart8/Toilettevisiteur/2.jpg",
                categoryKey: "douche-visiteur",
                caption: "Sanitaires visiteurs",
            },
            {
                src: "/img/Appart4/Toilettevisiteur/3.jpg",
                categoryKey: "douche-visiteur",
                caption: "Espace sanitaire",
            },

            {
                src: "/img/Appart4/Salon/1.jpg",
                categoryKey: "balcon",
                caption: "Accès au balcon",
            },
            {
                src: "/img/Appart8/Cuisine/Planche.jpg",
                categoryKey: "balcon",
                caption: "Équipement de rangement",
            },
            {
                src: "/img/Appart4/Salon/2.jpg",
                categoryKey: "balcon",
                caption: "Espace extérieur",
            },
            {
                src: "/img/Appart4/Salon/3.jpg",
                categoryKey: "balcon",
                caption: "Vue du balcon",
            },

            {
                src: "/img/Appart4/Espacecommun/1.jpg",
                categoryKey: "espace-commun",
                caption: "Espace commun du deuxième étage",
            },
            {
                src: "/img/Appart4/Espacecommun/2.jpg",
                categoryKey: "espace-commun",
                caption: "Salon commun",
            },
            {
                src: "/img/Appart4/Espacecommun/3.jpg",
                categoryKey: "espace-commun",
                caption: "Espace de détente commun",
            },
            {
                src: "/img/Appart4/Espacecommun/4.jpg",
                categoryKey: "espace-commun",
                caption: "Vue de l'espace commun",
            },
        ],
    },

    {
        id: 3,
        key: "prestige",
        locationKey: "bingerville",

        images: [
            {
                src: "/img/Appart8/Chambre_deux/4.jpg",
                categoryKey: "chambre",
                caption: "Chambre élégante",
            },
            {
                src: "/img/Appart8/Chambre_un/3.jpg",
                categoryKey: "chambre",
                caption: "Lit double confortable",
            },
            {
                src: "/img/Appart8/Chambre_deux/5.jpg",
                categoryKey: "chambre",
                caption: "Aménagement de la chambre",
            },
            {
                src: "/img/Appart8/Chambre_un/1.jpg",
                categoryKey: "chambre",
                caption: "Chambre principale",
            },
            {
                src: "/img/Appart8/Chambre_deux/3.jpg",
                categoryKey: "chambre",
                caption: "Espace nuit",
            },
            {
                src: "/img/Appart8/Chambre_un/2.jpg",
                categoryKey: "chambre",
                caption: "Vue de la chambre",
            },

            {
                src: "/img/Appart8/Salon/Salon.jpg",
                categoryKey: "salon",
                caption: "Vue principale du salon",
            },
            {
                src: "/img/Appart8/Salon/Salon1.jpg",
                categoryKey: "salon",
                caption: "Aménagement du salon",
            },
            {
                src: "/img/Appart8/Salon/Salon 5.jpg",
                categoryKey: "salon",
                caption: "Espace détente",
            },
            {
                src: "/img/Appart8/Salon/Salon2.jpg",
                categoryKey: "salon",
                caption: "Salon et mobilier",
            },
            {
                src: "/img/Appart8/Salon/Salon3.jpg",
                categoryKey: "salon",
                caption: "Décoration du salon",
            },
            {
                src: "/img/Appart8/Salon/Salon4.jpg",
                categoryKey: "salon",
                caption: "Vue complémentaire du salon",
            },
            {
                src: "/img/Appart8/Salon/Salon6.jpg",
                categoryKey: "salon",
                caption: "Aménagement intérieur",
            },

            {
                src: "/img/Appart8/Cuisine/Cuisine.jpg",
                categoryKey: "cuisine",
                caption: "Cuisine équipée",
            },
            {
                src: "/img/Appart8/Cuisine/Cuisine 02.jpg",
                categoryKey: "cuisine",
                caption: "Espace cuisine",
            },
            {
                src: "/img/Appart8/Cuisine/Cuisine 3.jpg",
                categoryKey: "cuisine",
                caption: "Machine à laver",
            },
            {
                src: "/img/Appart8/Cuisine/Cuisine5.jpg",
                categoryKey: "cuisine",
                caption: "Rangements de cuisine",
            },
            {
                src: "/img/Appart8/Cuisine/Refrigerateur.jpg",
                categoryKey: "cuisine",
                caption: "Réfrigérateur",
            },
            {
                src: "/img/Appart8/Cuisine/Cuisine4.jpg",
                categoryKey: "cuisine",
                caption: "Chauffe-eau",
            },

            {
                src: "/img/Appart8/Chambre_un/5.jpg",
                categoryKey: "douche-interieure",
                caption: "Espace salle de bain",
            },
            {
                src: "/img/Appart8/Chambre_un/6.jpg",
                categoryKey: "douche-interieure",
                caption: "Équipements intérieurs",
            },

            {
                src: "/img/Appart8/Salledebain/Salle de bain.jpg",
                categoryKey: "salle-de-bain",
                caption: "Équipements sanitaires",
            },
            {
                src: "/img/Appart8/Salledebain/Salle de bain 1.jpg",
                categoryKey: "salle-de-bain",
                caption: "Vue de la salle de bain",
            },
            {
                src: "/img/Appart8/Salledebain/Salle de bain 2.jpg",
                categoryKey: "salle-de-bain",
                caption: "Espace lavabo et douche",
            },
            {
                src: "/img/Appart8/Salledebain/Salle de bain 3.jpg",
                categoryKey: "salle-de-bain",
                caption: "Aménagement de la salle de bain",
            },

            {
                src: "/img/Appart8/Espacecommun/1.jpg",
                categoryKey: "espace-commun",
                caption: "Espace commun du deuxième étage",
            },
            {
                src: "/img/Appart8/Espacecommun/3.jpg",
                categoryKey: "espace-commun",
                caption: "Espace de détente commun",
            },
            {
                src: "/img/Appart8/Espacecommun/2.jpg",
                categoryKey: "espace-commun",
                caption: "Salon commun",
            },

            {
                src: "/img/Appart4/Salon/1.jpg",
                categoryKey: "balcon",
                caption: "Accès au balcon",
            },
            {
                src: "/img/Appart8/Cuisine/Planche.jpg",
                categoryKey: "balcon",
                caption: "Planche à repasser",
            },
            {
                src: "/img/Appart4/Salon/2.jpg",
                categoryKey: "balcon",
                caption: "Espace extérieur",
            },
            {
                src: "/img/Appart4/Salon/3.jpg",
                categoryKey: "balcon",
                caption: "Vue du balcon",
            },
        ],
    },
];

/* =========================================================
   TRADUCTIONS DES CATÉGORIES
========================================================= */

const CATEGORY_KEYS = {
    chambre: "gallery.categories.bedroom",
    salon: "gallery.categories.livingRoom",
    cuisine: "gallery.categories.kitchen",
    "douche-interieure": "gallery.categories.shower",
    "douche-visiteur": "gallery.categories.guestBathroom",
    "salle-de-bain": "gallery.categories.bathroom",
    balcon: "gallery.categories.balcony",
    "espace-commun": "gallery.categories.sharedSpace",
};

/* =========================================================
   UTILITAIRES
========================================================= */

const nameKey = (apartment) =>
    `appart.items.${apartment.key}.name`;

/*
 * Récupère l'appartement depuis :
 *
 * /rooms?apartment=elegance
 *
 * ou :
 *
 * /rooms?apartment=prestige
 *
 * Si aucun appartement valide n'est trouvé,
 * "signature" est utilisé.
 */

const getInitialApartment = () => {
    if (typeof window === "undefined") {
        return "signature";
    }

    const params = new URLSearchParams(
        window.location.search,
    );

    const apartmentKey = params.get("apartment");

    const apartmentExists = apartments.some(
        (item) => item.key === apartmentKey,
    );

    return apartmentExists
        ? apartmentKey
        : "signature";
};

/* =========================================================
   COMPOSANT GALERIE
========================================================= */

export default function Gallery() {
    const { t } = useTranslation();

    /* -----------------------------------------
       ÉTAT APPARTEMENT
    ----------------------------------------- */

    const [
        activeApartment,
        setActiveApartment,
    ] = useState(
        () => getInitialApartment(),
    );

    /* -----------------------------------------
       ÉTAT FILTRE
    ----------------------------------------- */

    const [
        activeFilter,
        setActiveFilter,
    ] = useState("all");

    /* -----------------------------------------
       ÉTAT LIGHTBOX
    ----------------------------------------- */

    const [
        lightboxIndex,
        setLightboxIndex,
    ] = useState(null);

    /* -----------------------------------------
       MÉDIA DU HERO
    ----------------------------------------- */

    const [
        heroMediaItem,
        setHeroMediaItem,
    ] = useState(heroMedia[0]);

    /* =========================================================
       APPARTEMENT COURANT
    ========================================================= */

    const apartment =
        apartments.find(
            (item) =>
                item.key === activeApartment,
        ) ?? apartments[0];

    /* =========================================================
       NOM DE L'APPARTEMENT
    ========================================================= */

    const apartmentTitle = t(
        nameKey(apartment),
        {
            defaultValue: apartment.key,
        },
    );

    /* =========================================================
       LOCALISATION
    ========================================================= */

    const apartmentLocation = t(
        `gallery.locations.${apartment.locationKey}`,
        {
            defaultValue:
                "Bingerville, Côte d'Ivoire",
        },
    );

    /* =========================================================
       PRÉPARATION DES IMAGES
    ========================================================= */

    const items = useMemo(
        () =>
            apartment.images.map(
                (image, index) => ({
                    ...image,

                    id: `${apartment.key}-${index}`,

                    categoryLabel: t(
                        CATEGORY_KEYS[
                            image.categoryKey
                        ] ??
                            "gallery.categories.other",
                        {
                            defaultValue:
                                image.categoryKey,
                        },
                    ),
                }),
            ),
        [apartment, t],
    );

    /* =========================================================
       FILTRES DISPONIBLES
    ========================================================= */

    const filters = useMemo(() => {
        const seen = new Set();

        return items
            .filter((item) => {
                if (
                    seen.has(
                        item.categoryKey,
                    )
                ) {
                    return false;
                }

                seen.add(
                    item.categoryKey,
                );

                return true;
            })
            .map((item) => ({
                group:
                    item.categoryKey,

                label:
                    item.categoryLabel,
            }));
    }, [items]);

    /* =========================================================
       PHOTOS VISIBLES
    ========================================================= */

    const visible = useMemo(
        () =>
            activeFilter === "all"
                ? items
                : items.filter(
                      (item) =>
                          item.categoryKey ===
                          activeFilter,
                  ),
        [
            items,
            activeFilter,
        ],
    );

    /* =========================================================
       PHOTO COURANTE DU LIGHTBOX
    ========================================================= */

    const current =
        lightboxIndex !== null
            ? visible[
                  lightboxIndex
              ] ?? null
            : null;

    /* =========================================================
       FERMER LIGHTBOX
    ========================================================= */

    const closeLightbox =
        useCallback(() => {
            setLightboxIndex(null);
        }, []);

    /* =========================================================
       PHOTO PRÉCÉDENTE
    ========================================================= */

    const showPrevious =
        useCallback(() => {
            setLightboxIndex(
                (index) => {
                    if (
                        index ===
                            null ||
                        visible.length ===
                            0
                    ) {
                        return null;
                    }

                    return (
                        (index -
                            1 +
                            visible.length) %
                        visible.length
                    );
                },
            );
        }, [visible.length]);

    /* =========================================================
       PHOTO SUIVANTE
    ========================================================= */

    const showNext =
        useCallback(() => {
            setLightboxIndex(
                (index) => {
                    if (
                        index ===
                            null ||
                        visible.length ===
                            0
                    ) {
                        return null;
                    }

                    return (
                        (index + 1) %
                        visible.length
                    );
                },
            );
        }, [visible.length]);

    /* =========================================================
       HERO
    ========================================================= */

    useEffect(() => {
        setHeroMediaItem(
            heroMedia[0],
        );
    }, []);

    /* =========================================================
       CLAVIER + BLOCAGE DU SCROLL
    ========================================================= */

    useEffect(() => {
        if (
            lightboxIndex ===
            null
        ) {
            return undefined;
        }

        const previousOverflow =
            document.body.style
                .overflow;

        const handleKeyDown = (
            event,
        ) => {
            if (
                event.key ===
                "Escape"
            ) {
                closeLightbox();
            }

            if (
                event.key ===
                "ArrowLeft"
            ) {
                showPrevious();
            }

            if (
                event.key ===
                "ArrowRight"
            ) {
                showNext();
            }
        };

        document.body.style.overflow =
            "hidden";

        document.addEventListener(
            "keydown",
            handleKeyDown,
        );

        return () => {
            document.body.style.overflow =
                previousOverflow;

            document.removeEventListener(
                "keydown",
                handleKeyDown,
            );
        };
    }, [
        lightboxIndex,
        closeLightbox,
        showPrevious,
        showNext,
    ]);

    /* =========================================================
       CHANGER D'APPARTEMENT
    ========================================================= */

    const changeApartment = (
        apartmentKey,
    ) => {
        setActiveApartment(
            apartmentKey,
        );

        setActiveFilter(
            "all",
        );

        setLightboxIndex(
            null,
        );

        if (
            typeof window !==
            "undefined"
        ) {
            const url =
                new URL(
                    window.location.href,
                );

            url.searchParams.set(
                "apartment",
                apartmentKey,
            );

            window.history.replaceState(
                {},
                "",
                url,
            );
        }
    };

    /* =========================================================
       CHANGER DE FILTRE
    ========================================================= */

    const changeFilter = (
        group,
    ) => {
        setActiveFilter(group);

        setLightboxIndex(
            null,
        );
    };

    /* =========================================================
       RENDU
    ========================================================= */

    return (
        <main className="gallery-page">

            {/* =================================================
               HERO
            ================================================= */}

            <section className="gallery-hero">

                {heroMediaItem?.type ===
                "video" ? (
                    <video
                        className="gallery-hero__media"
                        src={
                            heroMediaItem.src
                        }
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        aria-hidden="true"
                    />
                ) : (
                    <img
                        className="gallery-hero__media"
                        src={
                            heroMediaItem?.src
                        }
                        alt={t(
                            "gallery.heroMedia.residence",
                            {
                                defaultValue:
                                    "Résidence Néhémie",
                            },
                        )}
                    />
                )}

                <div
                    className="gallery-hero__overlay"
                    aria-hidden="true"
                />

                <div className="gallery-hero__content">

                    <span className="gallery-hero__subtitle">
                        {t(
                            "gallery.hero.subtitle",
                        )}
                    </span>

                    <h1>
                        {t(
                            "gallery.hero.title",
                        )}
                    </h1>

                    <p>
                        {t(
                            "gallery.hero.description",
                        )}
                    </p>

                </div>
            </section>

            {/* =================================================
               SECTION GALERIE
            ================================================= */}

            <section className="gallery-section">

                <div className="gallery-container">

                    {/* -----------------------------------------
                       TITRE
                    ----------------------------------------- */}

                    <div className="gallery-heading">

                        <h2>
                            {apartmentTitle}
                        </h2>

                    </div>

                    {/* -----------------------------------------
                       ONGLETS APPARTEMENTS
                    ----------------------------------------- */}

                    <div className="gallery-tabs-wrapper">

                        <div
                            className="gallery-tabs"
                            role="tablist"
                            aria-label={t(
                                "gallery.chooseApartment",
                                {
                                    defaultValue:
                                        "Choisir un appartement",
                                },
                            )}
                        >

                            {apartments.map(
                                (item) => {
                                    const isActive =
                                        activeApartment ===
                                        item.key;

                                    return (
                                        <button
                                            key={
                                                item.id
                                            }
                                            type="button"
                                            role="tab"
                                            aria-selected={
                                                isActive
                                            }
                                            className={
                                                isActive
                                                    ? "gallery-tab active"
                                                    : "gallery-tab"
                                            }
                                            onClick={() =>
                                                changeApartment(
                                                    item.key,
                                                )
                                            }
                                        >
                                            {t(
                                                nameKey(
                                                    item,
                                                ),
                                                {
                                                    defaultValue:
                                                        item.key,
                                                },
                                            )}
                                        </button>
                                    );
                                },
                            )}

                        </div>
                    </div>

                    {/* -----------------------------------------
                       FILTRES
                    ----------------------------------------- */}

                    <div
                        className="gallery-filters"
                        role="group"
                        aria-label={t(
                            "gallery.filterLabel",
                            {
                                defaultValue:
                                    "Filtrer les photos",
                            },
                        )}
                    >

                        {[
                            {
                                group:
                                    "all",

                                label:
                                    t(
                                        "gallery.filters.all",
                                        {
                                            defaultValue:
                                                "Tous",
                                        },
                                    ),
                            },

                            ...filters,
                        ].map(
                            (filter) => {
                                const isActive =
                                    activeFilter ===
                                    filter.group;

                                return (
                                    <button
                                        key={
                                            filter.group
                                        }
                                        type="button"
                                        aria-pressed={
                                            isActive
                                        }
                                        className={
                                            isActive
                                                ? "gallery-filter active"
                                                : "gallery-filter"
                                        }
                                        onClick={() =>
                                            changeFilter(
                                                filter.group,
                                            )
                                        }
                                    >
                                        {
                                            filter.label
                                        }
                                    </button>
                                );
                            },
                        )}

                    </div>

                    {/* -----------------------------------------
                       LOCALISATION + NOMBRE
                    ----------------------------------------- */}

                    <div className="gallery-location">

                        <span>
                            {
                                apartmentLocation
                            }
                        </span>

                        <span className="gallery-photo-count">
                            {
                                visible.length
                            }{" "}
                            {t(
                                "gallery.photos",
                                {
                                    defaultValue:
                                        "photos",
                                },
                            )}
                        </span>

                    </div>

                    {/* -----------------------------------------
                       PHOTOS
                    ----------------------------------------- */}

                    {visible.length >
                    0 ? (
                        <div className="gallery-grid">

                            {visible.map(
                                (
                                    image,
                                    index,
                                ) => (
                                    <article
                                        className="gallery-card"
                                        key={
                                            image.id
                                        }
                                    >

                                        <button
                                            type="button"
                                            className="gallery-image-button"
                                            onClick={() =>
                                                setLightboxIndex(
                                                    index,
                                                )
                                            }
                                            aria-label={t(
                                                "gallery.viewPhoto",
                                                {
                                                    caption:
                                                        image.caption,

                                                    defaultValue:
                                                        `Voir la photo : ${image.caption}`,
                                                },
                                            )}
                                        >

                                            <img
                                                src={
                                                    image.src
                                                }
                                                alt={
                                                    image.caption
                                                }
                                                loading="lazy"
                                                decoding="async"
                                            />

                                            <div className="gallery-card__overlay">

                                                <div className="gallery-card__caption">

                                                    <span className="gallery-card__line" />

                                                    <p>
                                                        {
                                                            image.caption
                                                        }
                                                    </p>

                                                </div>

                                            </div>

                                        </button>

                                    </article>
                                ),
                            )}

                        </div>
                    ) : (
                        <p className="gallery-empty">
                            {t(
                                "gallery.empty",
                                {
                                    defaultValue:
                                        "Aucune photo dans cette catégorie.",
                                },
                            )}
                        </p>
                    )}

                </div>

            </section>

            {/* =================================================
               LIGHTBOX
            ================================================= */}

            {current && (
                <div
                    className="gallery-lightbox"
                    onClick={
                        closeLightbox
                    }
                    role="dialog"
                    aria-modal="true"
                    aria-label={t(
                        "gallery.lightbox.preview",
                        {
                            defaultValue:
                                "Aperçu de la photo",
                        },
                    )}
                >

                    {/* -----------------------------------------
                       FERMER
                    ----------------------------------------- */}

                    <button
                        type="button"
                        className="gallery-lightbox__close"
                        onClick={(
                            event,
                        ) => {
                            event.stopPropagation();

                            closeLightbox();
                        }}
                        aria-label={t(
                            "gallery.lightbox.close",
                            {
                                defaultValue:
                                    "Fermer la photo",
                            },
                        )}
                    >
                        ×
                    </button>

                    {/* -----------------------------------------
                       NAVIGATION
                    ----------------------------------------- */}

                    {visible.length >
                        1 && (
                        <>
                            <button
                                type="button"
                                className="gallery-lightbox__nav gallery-lightbox__nav--prev"
                                onClick={(
                                    event,
                                ) => {
                                    event.stopPropagation();

                                    showPrevious();
                                }}
                                aria-label={t(
                                    "gallery.lightbox.previous",
                                    {
                                        defaultValue:
                                            "Photo précédente",
                                    },
                                )}
                            >
                                ‹
                            </button>

                            <button
                                type="button"
                                className="gallery-lightbox__nav gallery-lightbox__nav--next"
                                onClick={(
                                    event,
                                ) => {
                                    event.stopPropagation();

                                    showNext();
                                }}
                                aria-label={t(
                                    "gallery.lightbox.next",
                                    {
                                        defaultValue:
                                            "Photo suivante",
                                    },
                                )}
                            >
                                ›
                            </button>
                        </>
                    )}

                    {/* -----------------------------------------
                       IMAGE
                    ----------------------------------------- */}

                    <img
                        src={
                            current.src
                        }
                        alt={
                            current.caption
                        }
                        className="gallery-lightbox__image"
                        onClick={(
                            event,
                        ) =>
                            event.stopPropagation()
                        }
                    />

                    {/* -----------------------------------------
                       LÉGENDE
                    ----------------------------------------- */}

                    <div
                        className="gallery-lightbox__caption"
                        onClick={(
                            event,
                        ) =>
                            event.stopPropagation()
                        }
                    >

                        <span>
                            {
                                apartmentTitle
                            }
                        </span>

                        <h3>
                            {
                                current.caption
                            }
                        </h3>

                        <small>
                            {
                                current.categoryLabel
                            }
                        </small>

                        <p>
                            {
                                lightboxIndex +
                                1
                            }{" "}
                            /{" "}
                            {
                                visible.length
                            }
                        </p>

                    </div>

                </div>
            )}

        </main>
    );
} 