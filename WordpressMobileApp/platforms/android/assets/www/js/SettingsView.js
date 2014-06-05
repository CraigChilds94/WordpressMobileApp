/**
 * Represents the settings page
 * @param {DataStore} store Where all of the application data is stored
 */
var SettingsView = function(store) {

	/**
	 * Called upon init of this View
	 * @return Object  	this
	 */
	this.initialize = function() {
		this.el = $('<div/>');
	};

	/**
	 * Display the compiled Handlebars View
	 * @return Object  	this
	 */
	this.render = function() {
		this.el.html(SettingsView.template(
			{
				title: "Settings"
			}
		));

		return this;
	};

	this.initialize();
};

// Attach the templates
SettingsView.template = Handlebars.compile($('#settings-tpl').html());