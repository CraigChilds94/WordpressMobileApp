var app = {
	initialize: function() {
		this.detailsUrl = /^#post(\d+)/;
		this.registerEvents();

		this.store = new Posts(function() {
			$('body').html(new HomeView(app.store).render().el);
		});
	},
	
	showAlert: function (message, title) {
		if (navigator.notification) {
			navigator.notification.alert(message, null, title, 'OK');
		} else {
			alert(title ? (title + ": " + message) : message);
		}
	},

	registerEvents: function() {
		$(window).on('hashchange', $.proxy(this.route, this));
	},

	route: function() {
		var hash = window.location.hash;

		if(!hash) {
			$('body').html(new HomeView(this.store).render().el);
			return;
		}

		var match = hash.match(app.detailsUrl);
		if(match) {
			app.store.getById(Number(match[1]), function(post) {
				$('body').html(new PostView(post).render().el);
			});
		}
	}

};

app.initialize();