#!/usr/bin/env bash

### Bundle Back-end ###

# Remove existing production folder
rm -rf ./build/

# transpile .ts to .js
tsc --sourceMap false

### Bundle Front-end ###

# Create the directory for React
mkdir -p ./build/public/react/

# Navigate to the react directory
cd ./src/public/react/react-app

# Build React code
npm run build

# Rename the folder
mv build react-app

#Move the contents to the build/ directory
mv react-app ../../../../build/public/react/