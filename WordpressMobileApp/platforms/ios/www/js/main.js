/**
 * Main Application Controller
 * @type Object
 */
var app = {

	/**
	 * What happens upon the loading of the app
	 */
	init: function(callback) {
		window.location.hash = "";
		this.detailsUrl = /^#post(\d+)/;
		this.registerEvents();

		this.store = new Posts(function() {
			$('body').html(new HomeView(app.store).render().el);
		});

		callback();
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
		document.addEventListener("deviceready", this.onDeviceReady, false);

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
			//$('.content').hide().slideToggle("slow");
			//$('.content').hide().toggle("slide", {direction:"up"}, 200);
			return;
		}

		var match = hash.match(app.detailsUrl);
		if(match) {
			app.store.getById(Number(match[1]), function(post) {
				$('body').html(new PostView(post).render().el);
				$('.content').hide().fadeIn();
				//$('.content').hide().slideToggle("slow");
				//$('.content').hide().toggle("slide", {direction:"down"}, 200);
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
	},

	/**	
	 * Called when the device is ready
	 */
	onDeviceReady: function() {
		console.log("devide ready");
	}

};

