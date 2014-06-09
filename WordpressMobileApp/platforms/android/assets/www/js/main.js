/**
 * Main Application Controller
 * @type Object
 */
var Main = function() {
	
	var self = this;
	// Application config data
	this.conf = {
		routes: [
			{ name: "post", pattern: /^#post(\d+)/ },
			{ name: "settings", pattern: /#(sett)/ }
		]
	};

	/**
	 * The constructor of the main application
	 */
	this.init = function() {
		console.log('hello');
		window.location.hash = "";
		this.registerEvents();

		this.store = new DataStore(function() {

			// Once the datastore has been loaded
			// Start loading the views.
			self.updateView();
		});
	};

	this.registerEvents = function() {
		document.addEventListener("offline", this.onOffline, false);
		document.addEventListener("backbutton", this.onBackPressed, false);
		document.addEventListener("deviceready", this.onDeviceReady, false);

		// Handle routes
		$(window).on('hashchange', $.proxy(this.updateView, this));
	};

	/**
	 * What happens when the device is offline
	 */
	this.onOffline = function() {
		this.showAlert("You are not connected to the internet!", "No Internet");
	};

	/**
	 * When the device's back button is pressed
	 */
	this.onBackPressed = function() {
		// Go back to the main page, can configure to
		// work with different app hierarchies.
		if(window.location.hash != "") {
			window.location.hash = "";
		} else {
			navigator.app.exitApp();
		}
	};

	/**	
	 * Called when the device is ready
	 */
	this.onDeviceReady = function() {
		console.log("device ready");
	};

	/**
	 * Called when the view needs to be updated
	 * @return {Main} Return itself
	 */
	this.updateView = function() {

		console.log('view updated');

		// Run our router
		new Router(this.store, this.conf.routes, {

			// This is the index page view
			index: function(data) {
				view = new HomeView(self.store).render().el;
				$('body').html(view);
			}
		}, function() {
			// this is called once the route has been determined
			$('.content').hide().fadeIn();
		});

		var snapper = new Snap({
			element : document.getElementById('content'),
			minDragDistance: 50,
			disable: 'right',
			flickThreshold: 15
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
	};
};