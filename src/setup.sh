#!/bin/bash
npm install # react@18.2.0 react-dom@18.2.0 date-fns@3.0.0 --legacy-peer-deps
echo "http://localhost:3000"
npm run dev
echo "Development server stopped. To restart, run: cd src && npm run dev" 