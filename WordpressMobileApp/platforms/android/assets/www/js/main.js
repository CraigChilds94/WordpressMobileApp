/**
 * Main Application Controller
 * @type Object
 */
var app = {

	/**
	 * What happens upon the loading of the app
	 */
	initialize: function() {
		this.detailsUrl = /^#post(\d+)/;
		this.registerEvents();

		this.store = new Posts(function() {
			$('body').html(new HomeView(app.store).render().el);
		});
	},
	
	/**
	 * Show a native alert or a web version if not supported
	 * @param  String 	message 	The message in the alert
	 * @param  String	title   	The title of the alert
	 */
	showAlert: function (message, title) {
		if (navigator.notification) {
			navigator.notification.alert(message, null, title, 'OK');
		} else {
			alert(title ? (title + ": " + message) : message);
		}
	},

	/**
	 * Setup which events we're listening out for
	 */
	registerEvents: function() {
		document.addEventListener("offline", this.onOffline, false);
		document.addEventListener("backbutton", this.onBackPressed, false);

		// Handle routes
		$(window).on('hashchange', $.proxy(this.route, this));
	},

	/**
	 * Handle some application routes, we need to know what
	 * we're looking out for
	 */
	route: function() {
		var hash = window.location.hash;

		if(!hash) {
			$('body').html(new HomeView(this.store).render().el);
			$('.content').hide().fadeIn();
			return;
		}

		var match = hash.match(app.detailsUrl);
		if(match) {
			app.store.getById(Number(match[1]), function(post) {
				$('body').html(new PostView(post).render().el);
				$('.content').hide().fadeIn();
			});
		}
	},

	/**
	 * What happens when the device is offline
	 */
	onOffline: function() {
		this.showAlert("You are not connected to the internet!", "No Internet");
	},

	/**
	 * When the device's back button is pressed
	 */
	onBackPressed: function() {
		if(window.location.hash != "") {
			window.location.hash = "";
		}
	}

};

app.initialize();

