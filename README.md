Ionic 2 Three js  App
=====================

This is Ionic 2 apps.

## Using this project

You'll need the Ionic CLI with support for v2 apps:

```bash
$ npm install -g ionic
```
then..
```bash
$ npm install
```
Then run:

```bash
$ ionic serve 
```

To build app you need Cordova 

if you don't have Cordova install Cordova
```bash
$ npm install -g cordova@6.4.0 or npm install -g cordova@latest 
```
Then
Install crosswalk and QLStorage
```bash
$ cordova plugin add cordova-plugin-crosswalk-webview@2.2.0 --save
```
	then
	
```bash	
$ cordova plugin add cordova-sqlite-storage --save
```

then

```bash	
$ ionic plugin add cordova-plugin-camera --save
```

then 
  
```bash  
  $ ionic plugin add cordova-plugin-splashscreen
```
  
also

```bash
  $ ionic platform add android
```  
  
  
  

## Check dependency
Check Cordova
```bash
$ cordova -version
```

Check Ionic
```bash
$ ionic info
```
Check Cordova plugins
```bash
$ cordova plugin ls
```
## Commands to assembling
Build app for Android
```bash
$ ionic build android
```
Emulate app for Android (install Android Studio before https://developer.android.com/studio/index.html)
```bash
$ ionic emulate android
```
Run app in Cordova's browser environment
```bash
$ ionic run browser
```
Run app on Android device
```bash
$ ionic run android
```
More info on this can be found on the Ionic.
