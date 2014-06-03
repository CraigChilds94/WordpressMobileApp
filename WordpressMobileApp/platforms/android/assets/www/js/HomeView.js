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