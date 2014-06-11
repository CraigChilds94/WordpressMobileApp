/**
 * This is the definition for the post view
 */
var PostView = function(main, post) {

	// View config data
	this.conf = {
		title: main.conf.title,
		post: post
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
		this.el.html(PostView.template(this.conf));
		return this;
	};

	this.init();
};

Handlebars.registerPartial("post-drawer", $("#post-drawer-partial").html());
Handlebars.registerPartial("header", $("#header-partial").html());

// Attach the templates
PostView.template = Handlebars.compile($('#post-view-tpl').html());