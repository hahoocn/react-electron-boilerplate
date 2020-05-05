# react-electron-boilerplate
Boilerplate app for Electron with React

## Installation
You'll need to have [Node.js](https://nodejs.org) to get started.
````
$ git clone https://github.com/hahoocn/react-electron-boilerplate.git
$ npm install
````

## Running Dev Server (Development)
````
$ npm run start:hot
$ npm run start:dev
````
or run two servers with one command

````
$ npm run dev
````
After waiting for the webpack package, refresh the program

## Redux DevTools

We used [Electron DevTools Installer](https://github.com/MarshallOfSound/electron-devtools-installer) and [Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension)

## Building and Running Production
````
$ npm run build
$ npm run start
````

## Package
````
$ npm run package-mac
$ npm run package-win
````
package.json to modify the package configuration.

Packaged file output to the release folder

## Clean Build Folder
````
$ npm run clean
````

## Clean Release Folder
````
$ npm run clean:release
````
