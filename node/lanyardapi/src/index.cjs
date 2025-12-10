const axios = require('axios');

const BASE_URL = 'https://api.lanyard.rest/v1/users/';

class LanyardAPI {
    constructor(userId) {
        this.userId = userId;
        this.url = BASE_URL + userId;
    }

    async fetch() {
        try {
            const res = await axios.get(this.url);
            if (!res.data?.success) {
                throw new Error('Lanyard API returned success=false');
            }
            return res.data.data;
        } catch (error) {
            console.error('Lanyard fetch error:', error.message);
            throw error;
        }
    }

    async getDiscordUser() {
        const data = await this.fetch();
        return data.discord_user;
    }

    async getKV(key = null) {
        const data = await this.fetch();
        if (key !== null) {
            return data.kv?.[key] ?? null;
        }
        return data.kv || {};
    }

    async getActivities() {
        const data = await this.fetch();
        return data.activities || [];
    }

    async getStatus() {
        const data = await this.fetch();
        return {
            status: data.discord_status,
            active_on: {
                web: data.active_on_discord_web,
                desktop: data.active_on_discord_desktop,
                mobile: data.active_on_discord_mobile,
                embedded: data.active_on_discord_embedded
            },
            listening_to_spotify: data.listening_to_spotify
        };
    }

    async getUser() {
        const userStatusData = await this.getStatus();
        return new User(
            userData.id,
            userData.global_name || userData.display_name || userData.username,
            userData.username,
            userData.avatar,
            userData.bot,
            userStatusData.status,
            userStatusData.active_on,
            userStatusData.listening_to_spotify
        );
    }
}

class User {
    constructor(id, displayName, username, avatarHash, isBot = false, status, active_on, listening_to_spotify) {
        this.id = id;
        this.displayName = displayName;
        this.username = username;
        this.avatarHash = avatarHash;
        this.isBot = isBot;
        this.status = status;
        this.active_on = active_on;
        this.listening_to_spotify = listening_to_spotify;
    }

    get avatarURL() {
        // Discord CDN avatar URL (assumes non-animated, but you can improve this)
        const format = this.avatarHash?.startsWith('a_') ? 'gif' : 'png';
        return this.avatarHash 
            ? `https://cdn.discordapp.com/avatars/${this.id}/${this.avatarHash}.${format}`
            : null;
    }

    toString() {
        return `${this.displayName} (${this.username}#${this.discriminator})`;
    }

    // Discord deprecated discriminator, but if you still need it:
    get discriminator() {
        return '0'; // All new users are #0
    }
}

module.exports = {LanyardAPI, User}