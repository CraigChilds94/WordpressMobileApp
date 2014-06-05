/**
 * Main Application Controller
 * @type Object
 */
var app = {

	/**
	 * What happens upon the loading of the app
	 */
	init: function() {
		window.location.hash = "";
		this.registerEvents();

		this.store = new DataStore(function() {
			// Could load a splash screen here, or some
			// guide screen?
			
			// Load default page
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
		document.addEventListener("deviceready", this.onDeviceReady, false);

		// Handle routes
		$(window).on('hashchange', $.proxy(this.route, this));
	},

	/**
	 * Handle some application routes, we need to know what
	 * we're looking out for
	 */
	route: function() {
		var routes = [
			{ name: "post", pattern: /^#post(\d+)/ },
			{ name: "settings", pattern: /#(sett)/ }
		];

		new Router(this.store, routes).run({
			index : function(data) {
				$('body').html(new HomeView(data.store).render().el);
			},
			post: function(data) {
				data.store.getById(Number(data.match[1]), function(post) {
					$('body').html(new PostView(post).render().el);
				});
			},
			settings: function(data) {
				settingsview = new SettingsView(data.store);
				$('body').html(settingsview.render().el);

				$('.save-button').on('click', function(e) {
					data.store.saveSettings($('.settings input'), function() {
						app.showAlert("Your settings have been saved to the device.", "Settings Saved");
					});
					
					return false;
				});
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
		// Go back to the main page, can configure to
		// work with different app hierarchies.
		if(window.location.hash != "") {
			window.location.hash = "";
		} else {
			navigator.app.exitApp();
		}
	},

	/**	
	 * Called when the device is ready
	 */
	onDeviceReady: function() {
		console.log("devide ready");
	}

};

