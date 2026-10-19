// src/hooks/useDailyMenu.js

import { useCallback, useEffect, useState } from "react";
import menuService from "../services/menuService";

export default function useDailyMenu() {
    const [menu, setMenu] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadMenu = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await menuService.getToday();

            setMenu(data);
        } catch (err) {
            console.error(
                "[Menu] Erreur chargement menu :",
                err
            );

            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadMenu();
    }, [loadMenu]);

    return {
        menu,
        loading,
        error,
        reload: loadMenu,
    };
}