/**
 * This object handles the routing side of the application
 * @param {Datastore} datastore The data that the application has access to
 * @param {Array} patterns An array of patterns that the routes follow
 */
var Router = function(datastore, patterns, routes, callback) {

	/* Set some obj properties */
	this.store = datastore;
	this.page = window.location.hash;
	this.match = "";
	this.route = {};

	/**
	 * Constructor for the Router object
	 */
	this.init = function(routes, callback) {

		// If no page has been requested
		if(!this.page) {
			// Need to use the default view
			this.route['name'] = 'index';
			routes['index'](this.getData());
		} else {

			// Loop over everything in patterns
			for(key in patterns) {

				// r is the route found in the patterns array
				r = patterns[key];
				this.match = this.page.match(r.pattern);

				// If we've got a match
				if(this.match) {
					this.route['name'] = r.name;
					this.route['match'] = this.match;

					// a is the record with the matched name in the 
					// routes array which defines the views linked to a route
					a = routes[r.name];

					if(a != undefined) {
						view = r(this.getData());
					} else {
						view = routes['index'](this.getData());
					}

					break;
				}
			}
		}

		callback(this);
	};

	/**
	 * Get the data that is stored in this route
	 * @return {Object} This is where all the data that is passed to the view is returned
	 */
	this.getData = function() {
		return data = {
			store: this.store,
			route: this.route
		};
	};

	this.init(routes, callback);
	return this;
};