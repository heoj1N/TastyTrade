@echo off
echo Setting up Food App...

rem Install dependencies
echo Installing dependencies...
call npm install

rem Start the development server
echo Setup complete! Starting the development server...
echo You can access the app at http://localhost:3000
call npm run dev

rem If script execution reaches this point, it means the user interrupted the dev server
echo Development server stopped. To restart, run: cd src ^&^& npm run dev 