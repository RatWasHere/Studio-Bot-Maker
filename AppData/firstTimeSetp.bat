@echo off

REM Check if Node.js is installed
node -v >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
  echo Node.js is not installed. Installing...

  REM Download and run the Node.js installer
  curl -o nodeinstaller.msi https://nodejs.org/dist/latest/win-x64/nodejs-latest-win-x64.msi
  msiexec /i nodeinstaller.msi

  REM Verify the installation
  node -v >nul 2>&1
  IF %ERRORLEVEL% NEQ 0 (
    echo Failed to install Node.js. Aborting.
    pause
    exit /b
  )
)

REM Install dependencies using npm
npm install

REM Run your bot.js file
call :runBot
goto :eof

:runBot
pushd %~dp0
node bot.js
popd