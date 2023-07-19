# qkc
quick kirka client

quick kirka client is so far an AMD GPU optimized kirka.io client. Still under development.

`npm install`

`npm start build` to create the distribution executable

`npm start` to test launch


Known bugs:

-Frame rate limit problems on Nvidia drivers only.

-Sometimes >mode selection menu is laggy (frame rate limit problem)

-F8 key is broken right now unless you enable disable frame rate limit.

-F12 key do not open dev tools.


ToDo:

-Add Kirka ressource swapper to replace all skins to force a custom skin model. (either inject a chrome extension or use the swapper javascript directly? https://www.electronjs.org/docs/latest/api/session#sesloadextensionpath-options
Old docs: https://stackoverflow.com/a/53346604/39992)

-Auto enable frame rate limit when outside a game and disable frame rate limit when inside a game.

-Auto hide loading-scene element when joining a game.

-Populate the settings.html with all the options/features (css, gpu/electron switches, ...).

-Include pricelist injector selector (yzzz, bros, kryptic, average).

-Custom crosshair/weapon/css/skins selector menu with url fields.

-Fix best practices code

-Re-Enable V8 snapshot and other fast electron loading tricks

-Refactors code

