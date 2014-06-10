/**
 * Main Application Controller
 * @type Object
 */
var Main = function() {
	
	var self = this;
	// Application config data
	this.conf = {
		title: "Craig's Blog",
		routes: new Patterns(this)	
	};

	/**
	 * The constructor of the main application
	 */
	this.init = function() {
		window.location.hash = "";

		this.store = new DataStore(function() {

			// Once the datastore has been loaded
			// Start loading the views.
			self.updateView();
		});
	};

	this.registerEvents = function() {
		document.addEventListener("offline", this.onOffline, false);
		document.addEventListener("backbutton", this.onBackPressed, false);

		// Handle routes
		$(window).on('hashchange', $.proxy(this.updateView, this));
		return this;
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
	 * Called when the view needs to be updated
	 * @return {Main} Return itself
	 */
	this.updateView = function() {

		// Run our router
		new Router(this.store, this.conf.routes, new Routes(this), function() {
			// this is called once the route has been determined
			$('.content').hide().fadeIn();
			$('.hidden').hide();
		});
	};
};