/**
 * This object contains all of the route definitions
 */
var Routes = function(main) {
	routes = {

		// This is the index page view route
		index: function(data) {
			view = new HomeView(main).render().el;
			$('body').html(view);

			snapHandler();
			$('.refresh').on('click', function() {
				main.store.posts = main.store._reload(true);
			});
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

			snapHandler();
			$('.share').on('click', function() {
				var message = {
					text: '"' + p.title + '" by ' + p.author,
					url: p.permalink, 
					image: p.thumbnail
				};

				window.socialmessage.send(message);
			});
		}
	};

	return routes;
};

// Code that controls snap.js
function snapHandler() {
	// Snap js stuff
	var snapper = new Snap({
		element : document.getElementById('content'),
		minDragDistance: 50,
		disable: 'right',
		flickThreshold: 5
	});

	$('#open').on('click', function() {
		if (snapper.state().state == "left") {
			snapper.close();
		} else {
			snapper.open('left');
		}
	});

	$('#close').on('click', function() {
		snapper.close();
	});
}