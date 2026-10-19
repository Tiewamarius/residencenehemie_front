// src/services/menuService.js

import api from "../api/axios";
import endpoints from "../api/endpoints";

const menuService = {
    async getToday() {
        const response = await api.get(
            endpoints.restaurant.menuToday
        );

        return response.data;
    },

    async getMenus() {
        const response = await api.get(
            endpoints.restaurant.menus
        );

        return response.data;
    },
};

export default menuService;