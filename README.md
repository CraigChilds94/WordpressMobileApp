WordpressMobileApp
==================

A template for a HTML5 mobile app, using cordova which integrates a Wordpress feed.

This can be customised to offer new functionality, not only limited to the intergration of a Wordpress feed.

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

###Adding a view to the app
The view aspect of the application is handled using the Javascript library "handlebars.js".

This enables the injection of data, which can be pre-processed and displayed conditionally.

####Example
Here is an example view, this uses ratchet for basic mobile supported styling. A ```posts``` array is passed to this view and is iterated over using handlebars.
```
<script id="home-tpl" type="text/x-handlebars-template">
			<div class='header'>
				<header class="bar bar-standard bar-nav">
					<h1 class="title">{{title}}</h1>
				</header>
				<div class="content wrap">
					<ul class='post-list table-view'>
						{{#each posts}}
							<li class="table-view-cell media post-item" style="background-image: url({{thumbnail}})">
								<a class="navigate-right" href="#post{{id}}">
									<div class="media-body">
										{{title}}
										<p>{{{formatExcerpt excerpt}}}</p>
									</div>
								</a>
							</li>
						{{/each}}
					</ul>
				</div>
			</div>
		</script>
```

I also define a view object, like in this example there is a standard layout.

```
/**
 * Home view object
 * @param MemoryStore store Local storage object
 */
var HomeView = function(store) {

	/**
	 * Called upon init of this View
	 * @return Object  	this
	 */
	this.initialize = function() {
		this.el = $('<div/>');
	};

	/**
	 * Display the compiled Handlebars View
	 * @return Object  	this
	 */
	this.render = function() {
		this.el.html(HomeView.template(
			{
				title: "Craig's Blog",
				posts: store.posts
			}
		));

		return this;
	};

	this.initialize();
}

// We want to reduce the size of the excerpt as it's possible to be too large
Handlebars.registerHelper('formatExcerpt', function(a) {
  return new Handlebars.SafeString(a.substring(0, 152) + "[...]");
});

// Attach the templates
HomeView.template = Handlebars.compile($('#home-tpl').html());
```

Using this structure it is easy to swap in and out UI frameworks. You're not restricted to the use of ratchet but it works well as a base template.