/**
 * Create a view object for the Post viewing page
 */
var PostView = function() {

	/**
	 * Called upon init of this view
	 */
	this.initialize = function() {
		this.el = $('<div/>');
	};

	/**
	 * Render the view from the compiled template
	 */
	this.render = function() {
		this.el.html(PostView.template(post));
		return this;
	}

	this.initialize();
}

// Compile the template
PostView.template = Handlebars.compile($('#post-tpl').html());