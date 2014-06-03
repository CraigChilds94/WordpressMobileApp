/**
 * Create a view object for the Post viewing page
 */
var PostView = function() {

	this.initialize = function() {
		this.el = $('<div/>');
	};

	this.render = function() {
		this.el.html(PostView.template(post));
		return this;
	}

	this.initialize();
}

PostView.template = Handlebars.compile($('#post-tpl').html());