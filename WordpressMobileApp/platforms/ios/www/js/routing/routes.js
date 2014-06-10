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
			
			var p;
			view = main.store.getById(id, function(post){
				v =  new PostView(main, post).render().el;
				p = post;
				return v;
			});

			$('body').html(view);

			$('.share').on('click', function() {
				var message = {
					text: p.title,
					url: p.url
				};

				window.socialmessage.send(message);
			});
		}
	};

	return routes;
};