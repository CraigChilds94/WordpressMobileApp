/**
 * Home view object
 * @param MemoryStore store Local storage object
 */
var HomeView = function(store) {

	this.initialize = function() {
		this.el = $('<div/>');
	};

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