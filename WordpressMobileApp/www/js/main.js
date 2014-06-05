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

		this.routes = [
			{ name: "post", pattern: /^#post(\d+)/ },
			{ name: "settings", pattern: /#(sett)/ }
		];

		this.registerEvents();

		this.store = new DataStore(function() {
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
		new Router(this.store, this.routes).run({
			index : function(data) {
				$('body').html(new HomeView(data.store).render().el);
			},
			post: function(data) {
				data.store.getById(Number(data.match[1]), function(post) {
					$('body').html(new PostView(post).render().el);
				});
			},
			settings: function(data) {
				$('body').html(new SettingsView(data.store).render().el);
			}
		}, function(router) {
			$('.content').hide().fadeIn();
		});
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
		window.plugin.notification.local.add({ message: 'Great app!' });
	}

};

