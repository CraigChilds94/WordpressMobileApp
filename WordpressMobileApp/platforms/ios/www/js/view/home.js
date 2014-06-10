/**
 * Home view object
 * @param Main global app variable
 */
var HomeView = function(main) {

	// View config data
	this.conf = {
		title: main.conf.title,
		posts: main.store.posts
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

Handlebars.registerPartial("home-drawer", $("#home-drawer-partial").html());
Handlebars.registerPartial("header", $("#header-partial").html());

// Attach the templates
HomeView.template = Handlebars.compile($('#home-view-tpl').html());