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
				title: "Wordpress Mobile App",
				posts: store.posts
			}
		));
		
		return this;
	};

	this.initialize();
}

// Attach the templates
HomeView.template = Handlebars.compile($('#home-tpl').html());