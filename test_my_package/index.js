import lanyard from 'lanyardapi'; // Correct import syntax

(async () => {
    const api = new lanyard.LanyardAPI('1303002284136857694'); // Note the capitalization

    try {
        const user = await api.getUser(); // Correct method names (getUser, getkv, etc.)
        console.log('username:', user.username);
        console.log('display name:', user.displayName);  // Correct property name
        console.log('id:', user.id);
        console.log('avatar url:', user.avatarURL); // Correct property name
        console.log('is bot:', user.isBot); // Correct property name

        // get kv store
        console.log('all kv:', await api.getKV()); // Correct method name
        console.log('specific key (e.g., "key"):', await api.getKV('key'));

        // get status & device info
        console.log('status info:', await api.getStatus()); // Correct method name

        // get activities (e.g., custom status, minecraft)
        const activities = await api.getActivities(); // Correct method name
        console.log('active activities:', activities.map(a => a.name).join(', '));

    } catch (err) {
        console.error('failed to retrieve data:', err.message);
    }
})();