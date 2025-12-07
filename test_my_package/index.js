const { LanyardAPI, User } = require('lanyardapi')

(async () => {
    const api = new LanyardAPI('1303002284136857694');

    try {
        const user = await api.getUser();
        console.log('Username:', user.username);
        console.log('Display Name:', user.displayName);
        console.log('ID:', user.id);
        console.log('Avatar URL:', user.avatarURL);
        console.log('Is Bot:', user.isBot);

        // Get KV store
        console.log('All KV:', await api.getKV());
        console.log('Specific key (e.g., "key"):', await api.getKV('key'));

        // Get status & device info
        console.log('Status Info:', await api.getStatus());

        // Get activities (e.g., Custom Status, Minecraft)
        const activities = await api.getActivities();
        console.log('Active Activities:', activities.map(a => a.name).join(', '));

    } catch (err) {
        console.error('Failed to retrieve data:', err.message);
    }
})();