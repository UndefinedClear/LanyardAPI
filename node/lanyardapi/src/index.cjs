const axios = require('axios');

const BASE_URL = 'https://api.lanyard.rest/v1/users/';

class LanyardAPI {
    constructor(userId) {
        this.userId = userId;
        this.url = BASE_URL + userId;
        this._cache = null; // Optional: cache last response
    }

    async fetch() {
        try {
            const res = await axios.get(this.url);
            if (!res.data?.success) {
                throw new Error('Lanyard API returned success=false');
            }
            this._cache = res.data.data; // Only store the inner "data" object
            return this._cache;
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
        const userData = await this.getDiscordUser();
        return new User(
            userData.id,
            userData.global_name || userData.display_name || userData.username,
            userData.username,
            userData.avatar,
            userData.bot
        );
    }
}

class User {
    constructor(id, displayName, username, avatarHash, isBot = false) {
        this.id = id;
        this.displayName = displayName;
        this.username = username;
        this.avatarHash = avatarHash;
        this.isBot = isBot;
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