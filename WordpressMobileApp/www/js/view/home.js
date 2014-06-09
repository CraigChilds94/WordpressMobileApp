/**
 * Home view object
 * @param DataStore store Local storage object
 */
var HomeView = function(store) {

	// View config data
	this.conf = {
		title: "Craig's Blog",
		posts: store.posts
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
		this.el.html(HomeView.template(this.conf));
		return this;
	};

	this.init();
};

// Attach the templates
HomeView.template = Handlebars.compile($('#home-view-tpl').html());