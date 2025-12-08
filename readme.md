LanyardAPI for NodeJS and WebAPI

> To use in WEBAPI:
```html
<script src='https://raw.githubusercontent.com/UndefinedClear/LanyardAPI/refs/heads/main/web/lanyardapi.js'></script>
```

> To use in NodeJS:
```js
$ npm install lanyardapi

const lanyard = require('lanyardapi');

lanyard.User(id, displayName, username, avatarHash, isBot = false);
lanyard.LanyardAPI('YOUR_DISCORD_ID');
```