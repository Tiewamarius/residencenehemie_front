// src/services/restaurantService.js

import api from "../api/axios";
import endpoints from "../api/endpoints";

const restaurantService = {
    async getRestaurant() {
        const response = await api.get(
            endpoints.restaurant.home
        );

        return response.data;
    },

    async getGallery() {
        const response = await api.get(
            endpoints.restaurant.gallery
        );

        return response.data;
    },
};

export default restaurantService;