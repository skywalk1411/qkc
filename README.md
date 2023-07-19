# qkc
quick kirka client

`npm install`
`npm start build` to create the distribution executable
`npm start` to test launch

Known bugs:
-Frame rate limit problems on Nvidia drivers only.
-Sometimes >mode selection menu is laggy (frame rate limit problem)

ToDo:
-Add Kirka ressource swapper to replace all skins to force a custom skin model.
-Auto enable frame rate limit when outside a game and disable frame rate limit when inside a game.
-Auto hide loading-scene element when joining a game.
-Populate the settings.html with all the options/features (css, gpu/electron switches, ...).
-Include pricelist injector selector (yzzz, bros, kryptic, average).
-Custom crosshair/weapon/css/skins selector menu with url fields.
-Fix best practices code
-Re-Enable V8 snapshot and other fast electron loading tricks
-Refactors code
