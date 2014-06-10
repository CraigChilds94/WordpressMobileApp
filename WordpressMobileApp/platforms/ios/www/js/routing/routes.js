/**
 * This object contains all of the route definitions
 */
var Routes = function(main) {
	routes = {

		// This is the index page view route
		index: function(data) {
			view = new HomeView(main.store).render().el;
			$('body').html(view);
		}
	};

	return routes;
};