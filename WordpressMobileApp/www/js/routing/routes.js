/**
 * This object contains all of the route definitions
 */
var Routes = function(main) {
	routes = {

		// This is the index page view route
		index: function(data) {
			view = new HomeView(main).render().el;
			$('body').html(view);
		},

		// this is the post page route
		post: function(data) {
			id = Number(data.route.match[1]);

			view = main.store.getById(id, function(post){
				return new PostView(main, post).render().el;
			});

			$('body').html(view);
		}
	};

	return routes;
};