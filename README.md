WordpressMobileApp
==================

A template for a HTML5 mobile app, using cordova which integrates a Wordpress feed.

This can be customised to offer new functionality, not only limited to the intergration of a Wordpress feed.

#####Architecture
[link here](https://www.dropbox.com/s/io56hp9iowudc3t/Mobile%20App%20Architecture.png)

###Dependencies
- Cordova / Phonegap
- FeedJSON
	- This is a feed plugin for Wordpress and must be installed on the blog
- And the relevant SDK's or applications for your chosen platforms
- Handlebars.js
- jQuery
- Ratchet
	
##Run it
To test the given template/example clone this repository, ensure you have the above dependencies and atleast one platform SDK / emulator to run the app on.

Ensure that you check out the phonegap and cordova docs as your configuration may be different.

The example below is for android.

```
cd /path/to/project
cordova add platform android
cordova build android
cordova run android
```

For ios ensure that you have checked out the relevant docs and setup your project with xcode. In which case you'll only need to build the app using cordova, you'll be able to run it with xcode.

```
cd /path/to/project
cordova add platform ios
cordova build ios
```
##Designer Guide

I recommend that you take a look over the platforms design guidelines, this will give you an idea of the requirements.

###Graphics
You may be the designer for the project and need to know the structure that is required for the icons and splash screens. Standard images and graphics which are used on the front-end/app side can be stored in ```www/img```.

This varies depending upon the platform(s) you're developing for, ios's structure is handled within xcode and all graphics (icons, splash screens) should be placed within resources.

Android on the other hand is different and are stored within the ```platforms/android/res``` directory.

##Developer Guide
