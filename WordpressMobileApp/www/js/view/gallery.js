/**
 * This is the definition for the Gallery page
 */
var GalleryView = function(main, images) {

	// View config data
	this.conf = {
		title: main.conf.title,
		images: images
	};

	/**
	 * Construct rhe view object
	 * @return {HomeView} This object
	 */
	this.init = function() {
		this.el = $('<div/>');
	};

	/**
	 * Display the compiled Handlebars View
	 * @return Object  	this
	 */
	this.render = function() {
		this.el.html(GalleryView.template(this.conf));
		return this;
	};

	this.init();
};

Handlebars.registerPartial("post-drawer", $("#post-drawer-partial").html());
Handlebars.registerPartial("header", $("#header-partial").html());

// Attach the templates
GalleryView.template = Handlebars.compile($('#gallery-view-tpl').html());