@echo off
color a
title MetaFucker - Setup
echo Welcome to MetaInstaller!
timeout 1 > NUL
echo If any errors stopped the process, reinstall NodeJS.
timeout 2 > NUL
cls
title MetaFucker - Installing all packages...
color 4
echo Installing packages...
timeout 1 > NUL
title MetaFucker - Installing discord.js@12.0.1
timeout 1 > NUL
title MetaFucker - npm i discord.js@12.0.1
npm i discord.js@12.0.1 && del install.bat