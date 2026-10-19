// src/services/chatService.js

import api from "../api/axios";
import endpoints from "../api/endpoints";

const chatService = {

    async createConversation() {
        const response = await api.post(
            endpoints.chat.conversations
        );

        return response.data;
    },

    async sendMessage(conversationId, message) {
        const response = await api.post(
            endpoints.chat.messages,
            {
                conversation_id: conversationId,
                message,
            }
        );

        return response.data;
    },

    async getMessages(conversationId) {
        const response = await api.get(
            `${endpoints.chat.conversations}/${conversationId}/messages`
        );

        return response.data;
    },
};

export default chatService;